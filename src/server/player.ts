import { Point, RIGHT } from '../frontend/Point';

function getColorForSnake(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Player {
    id: string;
    blockSize: number;
    snakeBody: Point[];
    direction: Point;
    userscore: number;
    name: string;
    length: number;
    color: string;
    colorHead: string;
    sendingPew: boolean;
    dead: boolean;
    multi: boolean;
    single: boolean;
    isHost: boolean;

    constructor(id: string, name: string) {
        this.id = id;
        this.blockSize = 15;
        this.snakeBody = [
            { x: 12, y: 12 },
            { x: 12 - 1, y: 12 },
            { x: 12 - 2, y: 12 },
        ];
        this.direction = RIGHT;
        this.userscore = 0;
        this.name = name;
        this.length = 3;
        this.color = getColorForSnake();
        this.colorHead = getColorForSnake();
        this.sendingPew = false;
        this.dead = false;
        this.multi = false;
        this.single = false;
        this.isHost = false;
    }
}

export { Player };
