import { Server } from 'socket.io';
import { LobbySingle } from './lobbySingle';
import { LobbyMulti } from './lobbyMulti';
import { createRoomID } from './utils';
import { Lobby } from './Lobby';

class LobbyHandler {
    lobbyCount = 0;
    lobbies: {
        [key: string]: Lobby;
    };
    io: Server;

    constructor(io: Server) {
        this.lobbyCount = 0;
        this.lobbies = {};
        this.io = io;
    }

    createLobbyMulti() {
        let id = createRoomID(7);
        this.lobbies[id] = new LobbyMulti(id, this.io);
        this.lobbyCount += 1;
        console.log('Created a new multi-lobby with id ' + id);
        return this.lobbies[id];
    }

    createLobbySingle() {
        let id = createRoomID(7);
        this.lobbies[id] = new LobbySingle(id, this.io);
        this.lobbyCount += 1;
        console.log('Created a new single-lobby with id ' + id);
        return this.lobbies[id];
    }

    removeLobby(id: string) {
        delete this.lobbies[id];
        this.lobbyCount -= 1;
        console.log('Removed lobby with id ' + id);
    }

    getLobby(id: string) {
        //console.log("Trying to get " + id);
        return this.lobbies[id];
    }
}

export { LobbyHandler };
