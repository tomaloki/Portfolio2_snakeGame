import { Server } from 'socket.io';
import { Lobby } from './Lobby';
import { Game } from './Game';

class LobbyMulti extends Lobby {
    playerCount: number;
    hasEnoughPlayers = false;
    interval: NodeJS.Timeout | null;

    constructor(id: string, io: Server) {
        super(id, io, 1, 5, new Game());
        this.game.setLobby(this);
        this.playerCount = 0;
        this.hasEnoughPlayers = false;
        this.interval = null;
        this.interval = setInterval(this.update.bind(this), 80);
    }

    startGame() {
        this.inGame = true;
        this.game.setCandy(2);
        //this.interval = setInterval(this.update.bind(this), 80);
    }

    stopGame() {
        this.inGame = false;
        if (!!this.interval) {
            clearInterval(this.interval);
        }
    }
}

export { LobbyMulti };
