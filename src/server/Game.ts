import { Bot } from './bot';
import { Hindrance } from './hindrance';
import { Candy } from './candy';
import { Lobby } from './Lobby';
import { Gameboard } from './gameboard';
import { pointEq, moveInDirection, UP, DOWN, LEFT, RIGHT } from '../frontend/Point';
import { Laser } from './laser';

class Game {
    board: Gameboard;
    lobby: Lobby;

    lasers: Laser[];
    bots: Bot[];
    hindrance: Hindrance[];
    candies: Candy[];

    constructor() {
        this.lobby = {} as Lobby;
        this.lasers = [];
        this.bots = [];
        this.hindrance = [];
        this.candies = [];
        this.board = new Gameboard();
    }

    setLobby(lobby: Lobby) {
        this.lobby = lobby;
    }

    addLaser(laser: Laser) {
        this.lasers.push(laser);
    }

    removeLaser(laser: Laser) {
        if (!laser.sendingPew) {
            this.lasers = this.lasers.filter((l) => l.id !== laser.id);
        }
    }

    setCandy(number: number) {
        for (let i = 0; i < number; i++) {
            // Make sure the new candy doesn't spawn on any player
            let block = this.findBlock();
            let candy = new Candy(block.x, block.y);
            this.candies.push(candy);
        }
    }

    replaceHindrance(number: number) {
        for (let i = 0; i < number; i++) {
            let block = this.findBlock();
            let hindrance = new Hindrance(block.x, block.y);
            this.hindrance.push(hindrance);
        }
    }

    sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async addBot(number: number) {
        if (this.bots.length < 1) {
            await this.sleep(5_000);
        } else {
            await this.sleep(8_000);
        }
        for (let i = 0; i < number; i++) {
            const bot = new Bot();
            let place = Math.floor(Math.random() * 4) + 1;

            if (place === 1) {
                bot.xPosition = 0;
                bot.yPosition = -1;
                bot.setSnakebody(12, this.board.width + 1);
            }

            if (place === 2) {
                bot.xPosition = 0;
                bot.yPosition = 1;
                bot.setSnakebody(12, -1);
            }

            if (place === 3) {
                bot.xPosition = -1;
                bot.yPosition = 0;
                bot.setSnakebody(this.board.width + 1, 12);
            }

            if (place === 4) {
                bot.xPosition = 1;
                bot.yPosition = 0;
                bot.setSnakebody(-1, 12);
            }
            //1 = up
            //2 = down
            //3 = left
            //4 = right
            this.bots.push(bot);
        }
    }

    findBlock() {
        let allPlayerBlocks: any[] = [];

        Object.values(this.lobby.players).forEach(
            (player) => (allPlayerBlocks = allPlayerBlocks.concat(player.snakeBody))
        );

        this.bots.forEach((bot) => (allPlayerBlocks = allPlayerBlocks.concat(bot.snakeBody)));

        this.candies.forEach(
            (candy) =>
                (allPlayerBlocks = allPlayerBlocks.concat({
                    x: candy.x,
                    y: candy.y,
                }))
        );

        this.hindrance.forEach(
            (hindrance) =>
                (allPlayerBlocks = allPlayerBlocks.concat({
                    x: hindrance.x,
                    y: hindrance.y,
                }))
        );

        let xBlock = Math.floor(Math.random() * (this.board.width - 2));
        if (xBlock === 0) {
            //xBlock += 1;
        }
        let yBlock = Math.floor(Math.random() * this.board.height - 1);
        if (yBlock === -1) {
            yBlock += 2;
        }
        if (yBlock === 30) {
            yBlock -= 1;
        }

        for (let i = 0; i < allPlayerBlocks.length; ++i) {
            const block = allPlayerBlocks[i];
            if (xBlock === block.x && yBlock === block.y) {
                this.findBlock();
            }
        }

        return { x: xBlock, y: yBlock };
    }

    update() {
        this.lobby.players.forEach((player) => {
            let playerSnakeHead = moveInDirection(player.snakeBody[0], player.direction);

            //If the snake collides in himself.
            player.snakeBody.forEach((snakeBody) => {
                if (pointEq(playerSnakeHead, snakeBody)) {
                    console.log(`Game over for player: ${player.name} :-( !`);
                    player.dead = true;
                }
            });

            // If player collides with bot
            this.bots.forEach((bot) => {
                bot.snakeBody.forEach((snakeBody) => {
                    if (pointEq(playerSnakeHead, snakeBody)) {
                        player.dead = true;
                    }
                });
            });

            this.lobby.players.forEach((otherPlayer) => {
                if (player.id !== otherPlayer.id) {
                    player.snakeBody.forEach((snakeBodyBlock) => {
                        if (
                            otherPlayer.snakeBody[0].x === snakeBodyBlock.x &&
                            otherPlayer.snakeBody[0].y === snakeBodyBlock.y
                        ) {
                            console.log(`Game over for player: ${otherPlayer.name} :-( !`);
                            otherPlayer.dead = true;
                        }
                    });
                }
            });

            // Checks if the snake has eaten food, and increases the "array" by one if true
            this.candies.forEach((candy, index) => {
                if (playerSnakeHead.x === candy.x && playerSnakeHead.y === candy.y) {
                    player.snakeBody.push({ x: candy.x, y: candy.y });
                    this.candies.splice(index, 1);
                    this.setCandy(1);
                    player.userscore += 10;
                    player.length += 1;
                }
            });

            this.hindrance.forEach((hindrance, index) => {
                if (playerSnakeHead.x === hindrance.x && playerSnakeHead.y === hindrance.y) {
                    player.userscore -= 10;
                    this.hindrance.splice(index, 1);
                    this.replaceHindrance(1);
                    if (player.userscore < 0) {
                        player.dead = true;
                    }
                }
            });

            if (playerSnakeHead.x === this.board.width) {
                playerSnakeHead.x = -1;
            }
            if (playerSnakeHead.x === -2) {
                playerSnakeHead.x = this.board.width;
            }
            if (playerSnakeHead.y === this.board.width) {
                playerSnakeHead.y = -1;
            }
            if (playerSnakeHead.y === -2) {
                playerSnakeHead.y = this.board.width;
            }

            player.snakeBody.unshift(playerSnakeHead);
            player.snakeBody.pop();
        });

        this.bots.forEach((bot, index) => {
            this.updateBot(bot);

            let botNewBlock = {
                x: bot.snakeBody[0].x + bot.direction.x,
                y: bot.snakeBody[0].y + bot.direction.y,
            };

            if (botNewBlock.x === this.board.width + 1) {
                botNewBlock.x = -1;
            }
            if (botNewBlock.x === -2) {
                botNewBlock.x = this.board.width;
            }
            if (botNewBlock.y === this.board.width + 1) {
                botNewBlock.y = -1;
            }
            if (botNewBlock.y === -2) {
                botNewBlock.y = this.board.width;
            }

            bot.snakeBody.unshift({ x: botNewBlock.x, y: botNewBlock.y });
            bot.snakeBody.pop();

            // Checks if the snake has eaten food, and increases the "array" by one if true
            if (this.candies) {
                for (let i = 0; i < this.candies.length; i++) {
                    let candy = this.candies[i];
                    if (bot.snakeBody[0].x === candy.x && bot.snakeBody[0].y === candy.y) {
                        bot.snakeBody.push({ x: candy.x, y: candy.y });
                        this.candies.splice(i, 1);
                        this.setCandy(1);
                    }
                }
            }

            if (this.hindrance) {
                for (let i = 0; i < this.hindrance.length; i++) {
                    let hindrance = this.hindrance[i];
                    if (bot.snakeBody[0].x === hindrance.x && bot.snakeBody[0].y === hindrance.y) {
                        this.bots.splice(index, 1);
                        this.addBot(1);
                        this.hindrance.splice(i, 1);
                        this.replaceHindrance(1);
                    }
                }
            }

            // If bot collides with player
            Object.values(this.lobby.players).forEach((player) => {
                player.snakeBody.forEach((snakeBody) => {
                    if (botNewBlock.x === snakeBody.x && botNewBlock.y === snakeBody.y) {
                        this.bots.splice(index, 1);
                        this.addBot(1);
                    }
                });
            });
        });

        Object.values(this.lasers).forEach((laser) => {
            let playerSending = this.lobby.players.find(
                (player) => player.id === laser.laserFromPlayerId
            );
            
            if (playerSending === undefined) {
                return;
            }

            if (this.candies) {
                for (let i = 0; i < this.candies.length; i++) {
                    let candy = this.candies[i];
                    if (laser.blocks[0].x === candy.x && laser.blocks[0].y === candy.y) {
                        playerSending.snakeBody.push({ x: candy.x, y: candy.y });
                        playerSending.length += 1;
                        this.candies.splice(i, 1);
                        this.setCandy(1);
                        playerSending.userscore += 10;
                    }
                    for (let i = 0; i < this.hindrance.length; i++) {
                        let hindrance = this.hindrance[i];
                        if (
                            laser.blocks[0].x === hindrance.x &&
                            laser.blocks[0].y === hindrance.y
                        ) {
                            this.hindrance.splice(i, 1);
                            this.replaceHindrance(1);
                            playerSending.userscore += 5;
                            laser.sendingPew = false;
                        }
                    }
                }
            }

            let laserNewBlock = {
                x: laser.blocks[0].x + laser.xPosition,
                y: laser.blocks[0].y + laser.yPosition,
            };

            if (laserNewBlock.x === -2) {
                laser.sendingPew = false;
            }
            if (laserNewBlock.y === -2) {
                laser.sendingPew = false;
            }
            if (laserNewBlock.x >= this.board.width) {
                laser.sendingPew = false;
            }
            if (laserNewBlock.y >= this.board.height) {
                laser.sendingPew = false;
            }

            laser.blocks.pop();
            laser.blocks.unshift(laserNewBlock);
        });
    }

    updateBot(bot: Bot) {
        if (bot.changeDirection) {
            let time = Math.floor(Math.random() * 1000) + 200;

            if (pointEq(bot.direction, UP)) {
                bot.direction = [LEFT, RIGHT][Math.floor(Math.random() * 2)];
            } else if (pointEq(bot.direction, DOWN)) {
                bot.direction = [LEFT, RIGHT][Math.floor(Math.random() * 2)];
            } else if (pointEq(bot.direction, RIGHT)) {
                bot.direction = [UP, DOWN][Math.floor(Math.random() * 2)];
            } else if (pointEq(bot.direction, LEFT)) {
                bot.direction = [UP, DOWN][Math.floor(Math.random() * 2)];
            }

            bot.changeDirection = false;
            this.botChangeDirection(bot, time);
        }
    }

    botChangeDirection(bot: Bot, time: number) {
        setTimeout(function () {
            bot.changeDirection = true;
        }, time);
    }

    replaceCandy() {
        // Make sure the new candy doesn't spawn on any player
        let block = this.findBlock();
        return new Candy(block.x, block.y);
    }
}

export { Game };
