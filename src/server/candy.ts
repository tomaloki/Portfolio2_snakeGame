import { createUserID } from './utils';

class Candy {
    id: string;
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.id = createUserID(10);
        this.x = x;
        this.y = y;
    }
}

export { Candy };
