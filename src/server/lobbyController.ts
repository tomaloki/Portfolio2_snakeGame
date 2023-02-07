import { Server } from 'socket.io';
import { LobbyHandler } from './lobbyHandler';
import { SocketEvents } from '../frontend/SocketEvents';
import { Player } from './player';
import { Laser } from './laser';
import { LobbySingle } from './lobbySingle';
import { LobbyMulti } from './lobbyMulti';
import { Lobby } from './Lobby';
import { Point } from '../frontend/Point';

class LobbyController {
    io: Server;
    lobbyHandler: LobbyHandler;

    constructor(io: Server) {
        this.io = io;
        this.lobbyHandler = new LobbyHandler(io);

        io.sockets.on(SocketEvents.CONNECTION, (socket: any) => {
            socket.player = new Player(socket.id, '');
            console.log(`Connection established with socket ID: ${socket.id}`);

            socket.on(SocketEvents.CREATE_LOBBY_MULTI, (data: any) =>
                this.createLobbyMulti(socket, data)
            );
            socket.on(SocketEvents.JOIN_SINGLE_GAME, () => this.joinSingleGame(socket));
            socket.on(SocketEvents.JOIN_ANY_LOBBY, () => this.joinAnyLobby(socket));
            socket.on(SocketEvents.JOIN_LOBBY, (data: any) => this.joinLobby(socket, data));
        });
    }

    createLobbyMulti(socket: any, data: any) {
        if (!data) {
            console.error('No data found!');
            return;
        }

        //Check if a player is in a lobby
        if (socket.lobby) {
            this.disconnect(socket);
        }
        const lobby = this.lobbyHandler.createLobbyMulti();
        socket.emit(SocketEvents.CREATED_MULTI_GAME, { lobbyId: lobby.id });
    }

    joinLobby(socket: any, data: any) {
        if (!data) {
            console.error('No data found!');
            return;
        }

        let { id, playerName } = data;
        let lobby = this.lobbyHandler.getLobby(id);

        if (!lobby) {
            socket.emit(SocketEvents.LOBBY_NOT_EXIST);
            return;
        }

        if (playerName) {
            socket.player.name = playerName;
        }

        lobby.addPlayer(socket.player);

        if (data.typePlayer === 'multi') {
            lobby.players.find((player) => player.id === socket.id)!!.multi = true;
        }

        if (data.typePlayer === 'single') {
            lobby.players.find((player) => player.id === socket.id)!!.single = true;
        }

        socket.join(id);

        console.log('sending LOBBY_JOINED');
        socket.emit(SocketEvents.LOBBY_JOINED, {
            players: lobby.players,
            inGame: lobby.inGame,
            lobbyID: id,
        });

        socket.lobby = lobby;

        this.io.sockets.in(id).emit(SocketEvents.UPDATE_GAME, {
            players: lobby.players,
            candies: lobby.game.candies,
            inGame: lobby.inGame,
            lasers: lobby.game.lasers,
            bots: lobby.game.bots,
            hindrances: lobby.game.hindrance,
        });

        socket.on(SocketEvents.DISCONNECT, () => this.disconnect(socket));

        socket.on(SocketEvents.LOBBY_START_SINGLE, () => this.lobbyStartSingle(socket));
        socket.on(SocketEvents.LOBBY_START_MULTI, () => this.lobbyStartMulti(socket));
        socket.on(SocketEvents.NEW_DIRECTION, (vector: Point) => this.newDirection(socket, vector));
        socket.on(SocketEvents.REMOVE_LASER, (laser: Laser) => this.removeLaser(socket, laser));
        socket.on(SocketEvents.SEND_PEWPEW, () => this.sendPew(socket));
        socket.on(SocketEvents.DIFFICULTY_HIGHER, () => this.difficultyHigher(socket));
    }

    joinAnyLobby(socket: any) {
        //If there aren't any lobbies that exits to join, then we create a new one
        if (this.lobbyHandler.lobbyCount < 1) {
            let lobby = this.lobbyHandler.createLobbyMulti();
            socket.emit(SocketEvents.FOUND_LOBBY, lobby.id);
        } else {
            let bestLobby: Lobby | null = null;
            // Loop through each lobby to find the lobby that is the most full
            Object.values(this.lobbyHandler.lobbies).forEach((lobby) => {
                // If the lobby has space and is more full
                //console.log(lobby.id);
                //console.log(lobby.playerSpace);
                //console.log(lobby.playerCount);
                if (
                    lobby.getAvailableSpots() > 0 &&
                    lobby.getAvailableSpots() <
                        (!!bestLobby ? bestLobby.getAvailableSpots() : Infinity)
                ) {
                    bestLobby = lobby;
                }
            });
            // If we didn't find a suitable lobby, create a new one
            if (!bestLobby) {
                bestLobby = this.lobbyHandler.createLobbyMulti();
            }
            socket.emit(SocketEvents.FOUND_LOBBY, bestLobby.id);
        }
    }

    joinSingleGame(socket: any) {
        let lobby = this.lobbyHandler.createLobbySingle();
        socket.emit(SocketEvents.CREATED_SINGLE_GAME, lobby.id);
    }

    disconnect(socket: { lobby: Lobby; id: string }) {
        console.log('player left: ' + socket.id);
        const lobby = socket.lobby;
        lobby.removePlayer(socket.id);
        if (lobby.getPlayerCount() < 1) {
            console.log('Lobby is empty');
            this.lobbyHandler.removeLobby(lobby.id);
        } else {
            this.io.sockets.in(lobby.id).emit(SocketEvents.UPDATE_GAME, {
                players: lobby.players,
                candies: lobby.game.candies,
                inGame: lobby.inGame,
            });
            if (!lobby.getHasEnoughPlayers()) {
                console.log('not enough players');
                lobby.stopGame();
                this.io.sockets.in(lobby.id).emit(SocketEvents.GAME_END, {
                    players: lobby.players,
                    candies: lobby.game.candies,
                    lobbyID: lobby.id,
                    lasers: lobby.game.lasers,
                    bots: lobby.game.bots,
                    hindrances: lobby.game.hindrance,
                });
            }
        }
    }

    lobbyStartMulti(socket: { lobby: Lobby }) {
        const lobby = socket.lobby;
        if (lobby.getPlayerCount() >= 2) {
            lobby.startGame();
            this.io.to(lobby.id).emit(SocketEvents.ENOUGH_PLAYERS);
            this.io.sockets.in(lobby.id).emit(SocketEvents.GAME_START_MULTI);
            if (lobby.getPlayerCount() < 3) {
                this.io.to(lobby.id).emit(SocketEvents.ENOUGH_PLAYERS);
            }
        } else {
            this.io.to(lobby.id).emit(SocketEvents.WAITING_FOR_PLAYERS);
            console.log('Waiting for more players...');
            this.io.sockets.in(lobby.id).emit(SocketEvents.GAME_START_MULTI);
        }
    }

    lobbyStartSingle(socket: any) {
        const lobby = socket.lobby;
        lobby.startGame();
        this.io.sockets.in(lobby.id).emit(SocketEvents.GAME_START_SINGLE);
    }

    newDirection(socket: { lobby: LobbySingle | LobbyMulti; id: string }, vector: Point) {
        const lobby = socket.lobby;
        const player = lobby.players.find((player) => player.id === socket.id)!!;
        player.direction = vector;

        this.io.sockets.in(lobby.id).emit(SocketEvents.UPDATE_GAME, {
            players: lobby.players,
            candies: lobby.game.candies,
            inGame: lobby.inGame,
            lasers: lobby.game.lasers,
            bots: lobby.game.bots,
            hindrances: lobby.game.hindrance,
        });
    }

    sendPew(socket: { lobby: Lobby; id: string; emit: (evt: string) => void }) {
        let lobby = socket.lobby;
        let player = lobby.players.find((player) => player.id === socket.id)!!;
        let laser = new Laser(player.id, player.direction.x, player.direction.y);
        laser.setBlocks(player.snakeBody[0].x, player.snakeBody[0].y);
        laser.color = player.color;
        player.sendingPew = true;
        laser.sendingPew = true;
        socket.emit(SocketEvents.PEWPEWPEW);
        //console.log(laser);
        lobby.game.addLaser(laser);
        //update Game
        this.io.sockets.in(lobby.id).emit(SocketEvents.UPDATE_GAME, {
            players: lobby.players,
            candies: lobby.game.candies,
            inGame: lobby.inGame,
            lasers: lobby.game.lasers,
            bots: lobby.game.bots,
            hindrances: lobby.game.hindrance,
        });
    }

    removeLaser(socket: { lobby: Lobby }, laser: Laser) {
        let lobby = socket.lobby;
        lobby.game.removeLaser(laser);
    }

    difficultyHigher(socket: { lobby: Lobby }) {
        let lobby = socket.lobby;
        lobby.increaseDifficulty();
    }
}

export { LobbyController };
