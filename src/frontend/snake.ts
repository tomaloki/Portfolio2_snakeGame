import { Point, RIGHT } from './Point';

class Snake {
    snakeBody: any[];
    board: any;
    direction: Point;
    xPosition: number;
    yPosition: number;
    newxPosition: number;
    newyPosition: number;
    length: number;
    dead: boolean;
    multi: boolean;
    single: boolean;

    playerID: string | null;

    constructor(x: number, y: number, gameboard: any) {
        this.snakeBody = [
            {
                x: x || 0,
                y: y || 0,
            },
        ];

        this.board = gameboard;
        this.direction = RIGHT;
        this.xPosition = 1;
        this.yPosition = 0;
        this.newxPosition = 0;
        this.newyPosition = 0;
        this.length = 3;
        this.dead = false;
        this.multi = false;
        this.single = false;

        this.playerID = null;
    }
}

export { Snake };
