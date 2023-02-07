import { Gameboard } from './gameboard';
import { Snake } from './snake';
import { Candy } from './candy';
import { UpdateGameDate } from '../types/UpdateGameDate';
import { SocketEvents } from './SocketEvents';
import {
    canvas,
    context,
    highScoreLabel,
    highScoreListMulti,
    highScoreListSingle,
    userList,
} from './globals';
import { DOWN, LEFT, Point, pointEq, reverseVector, RIGHT, UP } from './Point';
import { increaseDifficulty } from './userScoreFunctions';
import { Player } from '../server/player';

class SnakeGame {
    board: Gameboard;
    snake: Snake;
    candies: Candy[];
    socket: any;

    data: UpdateGameDate | null;

    playDivApple = document.getElementById('playDivApple') as HTMLDivElement;
    playDivMonster = document.getElementById('playDivMonster') as HTMLDivElement;
    playDivSnakehead = document.getElementById('playDivSnakehead') as HTMLDivElement;
    playDivLaser = document.getElementById('playDivLaser') as HTMLDivElement;

    constructor() {
        this.board = new Gameboard();
        this.board.x = this.board.blockSize;
        this.board.y = this.board.blockSize;
        this.snake = new Snake(this.board.x, this.board.y, this.board);
        this.candies = [];

        canvas.width = (this.board.width - 1) * this.board.blockSize;
        canvas.height = (this.board.height - 1) * this.board.blockSize;
        this.socket = null;
        this.data = null;

        return this;
    }

    init(socket: any) {
        this.socket = socket;
        setInterval(this.update.bind(this), 80);
        this.addListeners();
    }

    addListeners() {
        window.addEventListener('keydown', this.handleDirectionChange.bind(this));
        window.addEventListener('keydown', this.handleLaserFire.bind(this));
    }

    handleDirectionChange(event: KeyboardEvent) {
        const newDirection = {
            ArrowLeft: LEFT,
            ArrowRight: RIGHT,
            ArrowUp: UP,
            ArrowDown: DOWN,
        }[event.code];

        // return early if unhandled keyCode
        if (!newDirection) return;

        if (!pointEq(reverseVector(newDirection), this.snake.direction)) {
            this.snake.direction = newDirection;
            this.socket.emit(SocketEvents.NEW_DIRECTION, newDirection);
        }
    }

    handleLaserFire(event: KeyboardEvent) {
        if (event.code === 'Space') {
            this.socket.emit(SocketEvents.SEND_PEWPEW);
        }
    }

    reset() {
        this.snake = new Snake(this.board.x, this.board.y, this.board);
        this.candies = [];
    }

    updateData(data: UpdateGameDate) {
        this.data = data;
        if (data?.candies) {
            for (let i = 0; i < data.candies.length; i++) {
                let candy = data.candies[i];
                this.candies[i] = new Candy(candy.x, candy.y, this.board);
            }
        }
        this.update();
    }

    update() {
        this.render();
    }

    render() {
        let boardX = this.board.x,
            boardY = this.board.y,
            blockSize = this.board.blockSize;

        const multiPlayers = [];
        const singlePlayers = [];
        userList.innerHTML = '';

        context.fillStyle = '#FFFFFF';
        context.strokeStyle = '#0c9028';

        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, canvas.width, canvas.height);

        let w = canvas.width;
        let h = canvas.height;

        context.beginPath();
        context.strokeStyle = 'rgb(0, 0, 0, 0.03)';
        context.lineWidth = 1;

        for (let x = 0; x <= w; x += this.board.blockSize) {
            context.moveTo(x, 0);
            context.lineTo(x, h);
        }

        for (let y = 0; y <= h; y += this.board.blockSize) {
            context.moveTo(0, y);
            context.lineTo(w, y);
        }
        context.stroke();

        this.playDivApple.innerHTML = '';
        for (let i = 0; i < this.candies.length; ++i) {
            const candy = this.candies[i];

            candy.render(context, this.playDivApple);
        }

        this.playDivMonster.innerHTML = '';
        if (this.data?.hindrances) {
            for (let i = 0; i < this.data.hindrances.length; ++i) {
                const hindrance = this.data.hindrances[i];

                let monster = document.createElement('img');
                monster.src = 'img/monster.png';
                monster.style.position = 'absolute';
                monster.style.width = 42 + 'px';
                monster.style.left = hindrance.x * blockSize + boardX - 12 + 'px';
                monster.style.top = hindrance.y * blockSize + boardY - 15 + 'px';
                this.playDivMonster.appendChild(monster);
            }
        }

        if (this.data?.bots) {
            for (let botIndex in this.data.bots) {
                const bot = this.data.bots[botIndex];

                bot.snakeBody.forEach((snakeBodyBlock: Point) => {
                    context.fillStyle = bot.color;
                    context.fillRect(
                        snakeBodyBlock.x * blockSize + boardX,
                        snakeBodyBlock.y * blockSize + boardY,
                        this.board.blockSize,
                        this.board.blockSize
                    );
                    context.strokeStyle = '#FFFFFF';
                    context.strokeRect(
                        snakeBodyBlock.x * blockSize + boardX,
                        snakeBodyBlock.y * blockSize + boardY,
                        this.board.blockSize - 1,
                        this.board.blockSize - 1
                    );
                });

                context.font = '12px Calibri';
                context.fillStyle = 'black';
                let textWidth = context.measureText(bot.name).width;
                context.fillText(
                    bot.name,
                    bot.snakeBody[0].x * blockSize + boardX + blockSize / 2 - textWidth / 2,
                    bot.snakeBody[0].y * blockSize + boardY - 5
                );
            }
        }

        this.playDivSnakehead.innerHTML = '';

        Object.values(this.data?.players ?? {}).forEach((player: Player) => {
            if (player.multi) {
                multiPlayers.push(player);
                if (player.dead) {
                    checkHighScoreMulti(player.name, player.userscore);
                }
            }
            if (player.single) {
                singlePlayers.push(player);
                if (player.dead) {
                    checkHighScoreSingle(player.name, player.userscore);
                }
                increaseDifficulty(player.userscore);
            }

            if (!player.dead) {
                context.fillStyle = 'rgb(151, 225, 178)';
                player.snakeBody.forEach((snakeBodyBlock: Point) => {
                    context.fillStyle = player.color;
                    context.fillRect(
                        snakeBodyBlock.x * blockSize + boardX,
                        snakeBodyBlock.y * blockSize + boardY,
                        this.board.blockSize,
                        this.board.blockSize
                    );
                    context.strokeStyle = '#FFFFFF';
                    context.strokeRect(
                        snakeBodyBlock.x * blockSize + boardX,
                        snakeBodyBlock.y * blockSize + boardY,
                        this.board.blockSize - 1,
                        this.board.blockSize - 1
                    );
                });

                context.fillStyle = player.colorHead;
                context.fillRect(
                    player.snakeBody[0].x * blockSize + boardX,
                    player.snakeBody[0].y * blockSize + boardY,
                    this.board.blockSize,
                    this.board.blockSize
                );

                let snakehead = document.createElement('img');
                snakehead.src = 'img/snakehead.png';

                if (pointEq(player.direction, UP)) {
                    snakehead.style.transform = 'rotate(180deg)';
                    snakehead.style.left = player.snakeBody[0].x * blockSize + boardX - 10 + 'px';
                    snakehead.style.top = player.snakeBody[0].y * blockSize + boardY - 18 + 'px';
                }

                if (pointEq(player.direction, LEFT)) {
                    snakehead.style.transform = 'rotate(90deg)';
                    snakehead.style.left = player.snakeBody[0].x * blockSize + boardX - 17 + 'px';
                    snakehead.style.top = player.snakeBody[0].y * blockSize + boardY - 10 + 'px';
                }

                if (pointEq(player.direction, RIGHT)) {
                    snakehead.style.transform = 'rotate(-90deg)';
                    snakehead.style.left = player.snakeBody[0].x * blockSize + boardX - 3 + 'px';
                    snakehead.style.top = player.snakeBody[0].y * blockSize + boardY - 10 + 'px';
                }
                if (pointEq(player.direction, DOWN)) {
                    snakehead.style.left = player.snakeBody[0].x * blockSize + boardX - 10 + 'px';
                    snakehead.style.top = player.snakeBody[0].y * blockSize + boardY - 5 + 'px';
                }

                snakehead.style.position = 'absolute';
                snakehead.style.width = 34 + 'px';
                this.playDivMonster.appendChild(snakehead);

                context.font = '14px Calibri';
                context.fillStyle = 'black';
                let textWidth = context.measureText(player.name).width;
                context.fillText(
                    player.name,
                    player.snakeBody[0].x * blockSize + boardX + blockSize / 2 - textWidth / 2,
                    player.snakeBody[0].y * blockSize + boardY - 5
                );
            }

            let person = document.createElement('person');
            person.innerText = `Player: ${player.name} / Score: ${player.userscore}\n`;
            userList.appendChild(person);

            if (player.single) {
                showHighScoresSingle();
            }
            if (player.multi) {
                showHighScoresMulti();
            }
        });

        let playerSending = null;
        this.playDivLaser.innerHTML = '';

        Object.values(this.data?.lasers ?? {}).forEach((laser) => {
            if (laser.sendingPew) {
                Object.values(this.data?.players ?? {}).forEach((player) => {
                    if (player.id === laser.laserFromPlayerId) {
                        playerSending = player;
                        //laser.setBlocks(playerSending.snakeBody[0].x, playerSending.snakeBody[0].y);
                        if (laser.sendingPew) {
                            let laserHead = {
                                x: laser.blocks[0].x,
                                y: laser.blocks[0].y,
                            };
                            laser.blocks.forEach(() => {
                                context.fillStyle = laser.color;
                                context.strokeStyle = '#FFFFFF';
                            });
                            let laserPew = document.createElement('img');
                            laserPew.src = 'img/laser.png';

                            if (laser.xPosition === 0 && laser.yPosition === -1) {
                                laserPew.style.transform = 'rotate(-90deg)';
                                laserPew.style.left = laserHead.x * blockSize + boardX - 25 + 'px';
                                laserPew.style.top = laserHead.y * blockSize + boardY - 12 + 'px';
                            }
                            if (laser.xPosition === -1 && laser.yPosition === 0) {
                                laserPew.style.transform = 'rotate(180deg)';
                                laserPew.style.left = laserHead.x * blockSize + boardX - 19 + 'px';
                                laserPew.style.top = laserHead.y * blockSize + boardY - 14 + 'px';
                            }
                            if (laser.xPosition === 1 && laser.yPosition === 0) {
                                laserPew.style.left = laserHead.x * blockSize + boardX - 32 + 'px';
                                laserPew.style.top = laserHead.y * blockSize + boardY - 17 + 'px';
                            }
                            if (laser.xPosition === 0 && laser.yPosition === 1) {
                                laserPew.style.transform = 'rotate(90deg)';
                                laserPew.style.left = laserHead.x * blockSize + boardX - 25 + 'px';
                                laserPew.style.top = laserHead.y * blockSize + boardY - 19 + 'px';
                            }

                            laserPew.style.position = 'absolute';
                            laserPew.style.width = 60 + 'px';
                            this.playDivLaser.appendChild(laserPew);
                        }
                    }
                });
            } else {
                this.socket.emit(SocketEvents.REMOVE_LASER, laser);
            }
        });
    }
}

const NO_OF_HIGH_SCORES = 10;

// SINGLE PLAYER LOCALSTORAGE

interface Score {
    score: number;
    username: string;
}

function showHighScoresSingle() {
    const highScores: Score[] = JSON.parse(localStorage.getItem('highScoresSingle') ?? '') || [];

    let highscore = document.createElement('highscore');
    highScoreListSingle.innerHTML = highScores
        .map((score) => `${score.username} - ${score.score}`)
        .slice(0, 1)
        .join();
    highScoreListSingle.appendChild(highscore);

    if (highScoreListSingle.innerText !== '') {
        highScoreLabel.innerHTML = 'TOP SINGLE SNAKE:';
    }
}

function checkHighScoreSingle(username: string, score: number) {
    const highScores = JSON.parse(localStorage.getItem('highScoresSingle') ?? '') || [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

    if (score > lowestScore) {
        const newScore: Score = { username, score };
        saveHighScoreSingle(newScore, highScores);
    }
}

function saveHighScoreSingle(score: Score, highScores: Score[]) {
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(NO_OF_HIGH_SCORES);

    localStorage.setItem('highScoresSingle', JSON.stringify(highScores));
}

// MULTI PLAYER LOCALSTORAGE
function showHighScoresMulti() {
    const highScores: Score[] = JSON.parse(localStorage.getItem('highScoresMulti') ?? '') || [];

    let highscoremulti = document.createElement('highscoremulti');
    highScoreListMulti.innerHTML = highScores
        .map((score) => `${score.username} - ${score.score}`)
        .slice(0, 1)
        .join();
    highScoreListMulti.appendChild(highscoremulti);

    if (highScoreListMulti.innerText !== '') {
        highScoreLabel.innerHTML = 'TOP MULTI SNAKE:';
    }
}

function checkHighScoreMulti(username: string, score: number) {
    const highScores = JSON.parse(localStorage.getItem('highScoresMulti') ?? '') || [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

    if (score > lowestScore) {
        const newScore: Score = { username, score };
        saveHighScoreMulti(newScore, highScores);
    }
}

function saveHighScoreMulti(score: Score, highScores: Score[]) {
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(NO_OF_HIGH_SCORES);

    localStorage.setItem('highScoresMulti', JSON.stringify(highScores));
}

export { SnakeGame };
