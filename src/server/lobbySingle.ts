import { Server } from 'socket.io';
import { Lobby } from './Lobby';
import { Game } from './Game';

class LobbySingle extends Lobby {
    playerCount: number;
    hasEnoughPlayers = false;
    interval: NodeJS.Timeout | null;

    constructor(id: string, io: Server) {
        super(id, io, 1, 1, new Game());
        this.game.setLobby(this);
        this.playerCount = 0;
        this.hasEnoughPlayers = false;
        this.interval = null;
    }

    startGame() {
        this.inGame = true;
        this.game.setCandy(2);
        this.game.replaceHindrance(4);
        this.game.addBot(1);
        this.interval = setInterval(this.update.bind(this), 80);
    }

    stopGame() {
        this.inGame = false;
        if (this?.interval) {
            clearInterval(this.interval);
        }
    }

    increaseDifficulty() {
        this.game.addBot(1);
        this.game.replaceHindrance(2);
    }
}

export { LobbySingle };
