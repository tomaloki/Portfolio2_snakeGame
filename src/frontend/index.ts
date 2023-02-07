import {
    createLobbyButton,
    finishScreen,
    gameOverButton,
    gameScreen,
    homeScreen,
    joinAnyLobbyButton,
    joinButton,
    joinInputText,
    lobbyID,
    lobbyIDHeadline,
    multiMenyScreen,
    playButtonMulti,
    playButtonSingle,
    scoreList,
    socket,
    userName,
    waitingForPlayers,
} from './globals';
import { SnakeGame } from './game';
import { SocketEvents } from './SocketEvents';
import { UpdateGameDate } from '../types/UpdateGameDate';
import { LobbyJoinedData } from '../types/LobbyJoinedData';
import { backgroundSound, laserSound, loseGameSound } from './sound';

let multiPlayers = [];

//const socket = io("https://portfolio2-data2410-snakes.herokuapp.com"); // this is for the main project
//const socket = io("https://portfolio2-tomaloki.herokuapp.com"); //this is for tomaloki's project

let game = new SnakeGame();

playButtonSingle.addEventListener('click', startGameSingle);
playButtonMulti.addEventListener('click', startGameMulti);
joinAnyLobbyButton.addEventListener('click', joinAnyLobby);
createLobbyButton.addEventListener('click', createLobby);
joinButton.addEventListener('click', joinLobby);

function submitUsername() {
    if (userName.value === '') {
        alert('Enter a username!');
        location.reload();
    }
    // userName.setCustomValidity("");
    else {
        socket.emit(SocketEvents.USERNAME, userName.value);
        userName.innerHTML = '';
    }
}

// Setup socket event listeners:
socket.on(SocketEvents.CREATED_MULTI_GAME, handleCreatedMultiGame);
socket.on(SocketEvents.DISCONNECT, handleDisconnect);

// Setup on click listeners:
gameOverButton.addEventListener('click', () => {
    location.reload();
});

function handleDisconnect() {
    if (gameScreen.style.display === 'block') {
        alert('Server connection lost!');
        location.reload();
    }
}

function submitLobbyId() {
    let readyToJoin = true;
    if (joinInputText.value === '') {
        alert('Enter a Loddy-id!');
        readyToJoin = false;
    }
    return readyToJoin;
}

function joinAnyLobby() {
    socket.emit(SocketEvents.JOIN_ANY_LOBBY, {});
    socket.on(SocketEvents.FOUND_LOBBY, (id: string) => {
        console.log('Hey, found lobby ' + id);
        joinLobby2(id);
    });
}

function createLobby() {
    socket.emit(SocketEvents.CREATE_LOBBY_MULTI, {
        playerName: userName,
    });
}

function joinLobby() {
    if (!submitLobbyId()) {
        return;
    }

    const playerName = userName.value;
    socket.emit(SocketEvents.JOIN_LOBBY, {
        playerName: playerName,
        id: joinInputText.value,
        typePlayer: 'multi',
    });

    onLobbyJoind();
    startLobbyMulti();
}

function joinLobby2(id: string) {
    const playerName = userName.value;
    socket.emit(SocketEvents.JOIN_LOBBY, {
        playerName: playerName,
        id: id,
        typePlayer: 'multi',
    });
    onLobbyJoind();
    startLobbyMulti();
}

function joinLobbySingle(id: string) {
    const playerName = userName.value;
    socket.emit(SocketEvents.JOIN_LOBBY, {
        playerName: playerName,
        id: id,
        typePlayer: 'single',
    });
    onLobbyJoind();
    startLobbySingle();
}

function updateLobbyData(data: UpdateGameDate | LobbyJoinedData) {
    multiPlayers = data.players;
}

function startLobbySingle() {
    socket.emit(SocketEvents.LOBBY_START_SINGLE);
}

function startLobbyMulti() {
    socket.emit(SocketEvents.LOBBY_START_MULTI);
}

function onLobbyJoind() {
    socket.on(SocketEvents.LOBBY_JOINED, handleLobbyJoind);

    socket.on(SocketEvents.LOBBY_NOT_EXIST, () => {
        console.log('LOBBY DOES NOT EXIST');
        document.write("This lobby doesn't exist");
        setTimeout(function () {
            window.location.href = '/';
        }, 1500);
    });

    socket.on(SocketEvents.UPDATE_GAME, function (data: UpdateGameDate) {
        //console.log('update game');
        updateLobbyData(data);
        game.updateData(data);
    });

    finishScreen.style.display = 'block';
}

function handleGameStart() {
    console.log('Game start!');
    multiMenyScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    userName.innerHTML = '';
    game.init(socket);
    backgroundSound.play();
}

function handleGameEnd() {
    //canvas.style.display = "none";
    userName.innerText = '';

    backgroundSound.pause();
    loseGameSound.play();
    finishScreen.style.display = 'block';
    gameScreen.style.display = 'none';
}

// --- WAITING FOR PLAYERS
function handleWaitingForPlayers() {
    console.log('Waiting for players!');
    //canvas.style.display = "none";

    waitingForPlayers.style.display = 'block';
}
function handleEnoughPlayers() {
    console.log("Enough snakezzz- let's play!");

    waitingForPlayers.style.display = 'none';
}

function handleCreatedMultiGame(data: { lobbyId: string }) {
    joinInputText.value = data.lobbyId;
}

function handleLobbyJoind(data: LobbyJoinedData) {
    console.log('LOBBY JOINED => ' + data.players);

    // TODO: Fix type
    game.updateData(data as unknown as UpdateGameDate);

    lobbyID.innerHTML = data.lobbyID;
    lobbyID.style.textAlign = 'right';

    if (data.inGame) {
        multiMenyScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        homeScreen.style.display = 'none';
    } else {
        multiMenyScreen.style.display = 'block';
        gameScreen.style.display = 'none';
        homeScreen.style.display = 'none';

        updateLobbyData(data);
    }

    socket.on(SocketEvents.GAME_START_MULTI, handleGameStart);
    socket.on(SocketEvents.GAME_START_SINGLE, handleGameStart);
    socket.on(SocketEvents.GAME_END, handleGameEnd);
    finishScreen.style.display = 'none';
    socket.on(SocketEvents.WAITING_FOR_PLAYERS, handleWaitingForPlayers);
    waitingForPlayers.style.display = 'none';
    socket.on(SocketEvents.ENOUGH_PLAYERS, handleEnoughPlayers);
}

function startGameMulti() {
    scoreList.innerHTML = 'CONNECTED PLAYERS:';
    lobbyIDHeadline.innerHTML = 'LOBBY ID:';
    submitUsername();
    homeScreen.style.display = 'none';
    multiMenyScreen.style.display = 'block';
    finishScreen.style.display = 'none';
}

function startGameSingle() {
    scoreList.innerHTML = 'YOUR SCORE:';
    lobbyID.style.display = 'none';
    finishScreen.style.display = 'none';
    submitUsername();
    socket.emit(SocketEvents.JOIN_SINGLE_GAME, {});
    socket.on(SocketEvents.CREATED_SINGLE_GAME, (id: string) => {
        console.log('Hey, found lobby ' + id);
        joinLobbySingle(id);
    });
}

socket.on(SocketEvents.PEWPEWPEW, () => {
    laserSound.play();
});

let link = true;

function loading() {
    setTimeout(function () {
        link = true;
    }, 1000);
}

export { startGameSingle };
