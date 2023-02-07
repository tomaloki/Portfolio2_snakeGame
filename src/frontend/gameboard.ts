class Gameboard {
    width: number;
    height: number;
    x: number;
    y: number;
    blockSize: number;

    constructor() {
        // Make sure the width and height are even numbers so the snake can spawn in the middle
        // In blocks
        this.width = 36;
        this.height = 36;

        // In pixels
        this.x = 0;
        this.y = 0;

        this.blockSize = 15;
    }

    render(context: any) {
        context.fillStyle = '#FFFFFF';
        context.fillRect(this.x, this.y, this.width * this.blockSize, this.height * this.blockSize);
    }
}

export { Gameboard };
