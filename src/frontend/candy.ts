import { Gameboard } from './gameboard';

class Candy {
    x: number;
    y: number;
    board: Gameboard;

    constructor(x: number, y: number, gameboard: Gameboard) {
        this.x = x || 0;
        this.y = y || 0;
        this.board = gameboard;
    }

    render(context: any, playDiv: HTMLDivElement) {
        let boardX = this.board.x,
            boardY = this.board.y,
            blockSize = this.board.blockSize;

        //context.fillStyle = '#FF5154';
        //context.fillRect(this.x * blockSize + boardX, this.y * blockSize + boardY, blockSize, blockSize);

        let apple = document.createElement('img');
        apple.src = 'img/apple.png';
        apple.style.position = 'absolute';
        apple.style.width = 17 + 'px';
        apple.style.left = this.x * blockSize + boardX - 2 + 'px';
        apple.style.top = this.y * blockSize + boardY - 6 + 'px';
        playDiv.appendChild(apple);
    }
}

export { Candy };
