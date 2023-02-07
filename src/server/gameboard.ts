class Gameboard {
    width: number;
    height: number;
    blockSize: number;

    constructor() {
        // Make sure the width and height are even numbers so the snake can spawn in the middle
        this.width = 34;
        this.height = 34;
        this.blockSize = 15;
    }
}

export { Gameboard };
