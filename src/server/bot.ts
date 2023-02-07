import { DOWN, LEFT, Point, pointEq, RIGHT, UP } from '../frontend/Point';

class Bot {
    blockSize: number;
    snakeBody: Point[];
    direction: Point;
    xPosition: number;
    yPosition: number;
    userscore: number;
    name: string;
    color: string;
    colorHead: string;
    dead: boolean;
    length: number;

    changeDirection: boolean;

    constructor() {
        this.blockSize = 15;
        this.snakeBody = [{ x: 0, y: 0 }];
        this.direction = RIGHT;
        this.userscore = 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.name = 'bot';
        this.color = 'black';
        this.colorHead = 'black';
        this.dead = false;
        this.length = 6;

        this.changeDirection = true;
    }

    setSnakebody(xBlock: number, yBlock: number) {
        if (pointEq(this.direction, LEFT)) {
            this.snakeBody = [
                { x: xBlock, y: yBlock },
                { x: xBlock - 1, y: yBlock },
                { x: xBlock - 2, y: yBlock },
                { x: xBlock - 3, y: yBlock },
                { x: xBlock - 4, y: yBlock },
                { x: xBlock - 5, y: yBlock },
            ];
        }
        if (pointEq(this.direction, RIGHT)) {
            this.snakeBody = [
                { x: xBlock, y: yBlock },
                { x: xBlock + 1, y: yBlock },
                { x: xBlock + 2, y: yBlock },
                { x: xBlock + 3, y: yBlock },
                { x: xBlock + 4, y: yBlock },
                { x: xBlock + 5, y: yBlock },
            ];
        }
        if (pointEq(this.direction, UP)) {
            this.snakeBody = [
                { x: xBlock, y: yBlock },
                { x: xBlock, y: yBlock - 1 },
                { x: xBlock, y: yBlock - 2 },
                { x: xBlock, y: yBlock - 3 },
                { x: xBlock, y: yBlock - 4 },
                { x: xBlock, y: yBlock - 5 },
            ];
        }
        if (pointEq(this.direction, DOWN)) {
            this.snakeBody = [
                { x: xBlock, y: yBlock },
                { x: xBlock, y: yBlock + 1 },
                { x: xBlock, y: yBlock + 2 },
                { x: xBlock, y: yBlock + 3 },
                { x: xBlock, y: yBlock + 4 },
                { x: xBlock, y: yBlock + 5 },
            ];
        }
    }
}

export { Bot };
