import { socket } from './globals';
import { SocketEvents } from './SocketEvents';
import { levelUpSound } from './sound';

let currentDiff = 1;

function increaseDifficulty(userscore: number) {
    if (userscore >= 100 && currentDiff === 1) {
        socket.emit(SocketEvents.DIFFICULTY_HIGHER);
        levelUpSound.play();
        currentDiff = 2;
    }
    if (userscore >= 200 && currentDiff === 2) {
        socket.emit(SocketEvents.DIFFICULTY_HIGHER);
        levelUpSound.play();
        currentDiff = 3;
    }
    if (userscore >= 300 && currentDiff === 3) {
        socket.emit(SocketEvents.DIFFICULTY_HIGHER);
        levelUpSound.play();
        currentDiff = 4;
    }
    if (userscore >= 400 && currentDiff === 4) {
        socket.emit(SocketEvents.DIFFICULTY_HIGHER);
        levelUpSound.play();
        currentDiff = 5;
    }
}

export { increaseDifficulty };
