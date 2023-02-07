import { createUserID } from './utils';

class Laser {
    id: string;
    laserFromPlayerId: string;
    xPosition: number;
    yPosition: number;
    blocks: any[];
    color: string;
    sendingPew: boolean;
    blockSize: number;
    length: number;

    constructor(playerID: string, xPosition: number, yPosition: number) {
        this.id = createUserID(10);
        this.laserFromPlayerId = playerID;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.blocks = [];
        this.color = 'black';
        this.sendingPew = false;
        this.blockSize = 15;
        this.length = 3;
    }

    setBlocks(xBlock: number, yBlock: number) {
        if (this.xPosition === -1 && this.yPosition === 0) {
            this.blocks = [
                { x: xBlock - 4, y: yBlock },
                { x: xBlock - 5, y: yBlock },
                { x: xBlock - 6, y: yBlock },
            ];
        }
        if (this.xPosition === 1 && this.yPosition === 0) {
            this.blocks = [
                { x: xBlock + 4, y: yBlock },
                { x: xBlock + 5, y: yBlock },
                { x: xBlock + 6, y: yBlock },
            ];
        }
        if (this.xPosition === 0 && this.yPosition === -1) {
            this.blocks = [
                { x: xBlock, y: yBlock - 4 },
                { x: xBlock, y: yBlock - 5 },
                { x: xBlock, y: yBlock - 6 },
            ];
        }
        if (this.xPosition === 0 && this.yPosition === 1) {
            this.blocks = [
                { x: xBlock, y: yBlock + 4 },
                { x: xBlock, y: yBlock + 5 },
                { x: xBlock, y: yBlock + 6 },
            ];
        }
    }
}

export { Laser };
