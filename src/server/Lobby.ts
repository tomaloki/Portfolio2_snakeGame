import { Server } from 'socket.io';
import { Player } from './player';
import { Game } from './Game';
import { SocketEvents } from '../frontend/SocketEvents';

class Lobby {
    id: string;
    io: Server;
    game: Game;
    minPlayers: number;
    maxPlayers: number;
    players: Player[];
    inGame: boolean;

    constructor(id: string, io: Server, minPlayers: number, maxPlayers: number, game: Game) {
        this.id = id;
        this.io = io;
        this.game = game;

        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;

        this.players = [];

        this.inGame = false;
    }

    // Abstract methods
    startGame() {}
    stopGame() {}
    increaseDifficulty() {}

    addPlayer(player: Player) {
        this.players.push(player);

        console.log(
            `Player "${player.name}" with ID: ${player.id} (${
                player.isHost ? 'host' : 'player'
            }) joined lobby ${this.id}`
        );

        if (this.getAvailableSpots() < 1) {
            console.log('LobbyMulti with id ' + this.id + ' id full.');
        }
    }

    removePlayer(playerID: string) {
        this.players = this.players.filter((player) => player.id !== playerID);
        console.log(`Player with ID ${playerID} left lobby ${this.id}`);
    }

    getPlayerCount(): number {
        return this.players.length;
    }

    getAvailableSpots(): number {
        return this.maxPlayers - Object.values(this.players).length;
    }

    getHasEnoughPlayers(): boolean {
        return this.players.length >= this.minPlayers;
    }

    update() {
        this.game.update();

        Object.values(this.players).forEach((player) => {
            if (player.dead) {
                this.io.to(player.id).emit(SocketEvents.GAME_END);
            }
        });

        this.io.sockets.in(this.id).emit(SocketEvents.UPDATE_GAME, {
            players: this.players,
            candies: this.game.candies,
            inGame: this.inGame,
            lasers: this.game.lasers,
            bots: this.game.bots,
            hindrances: this.game.hindrance,
        });
    }
}

export { Lobby };
