import * as io from 'socket.io-client';

const userList = document.getElementById('userList') as HTMLUListElement;
const scoreList = document.getElementById('scoreList') as HTMLHeadingElement;
const highScoreLabel = document.getElementById('highScoreLbl') as HTMLHeadingElement;
const highScoreListSingle = document.getElementById('highScoreListSingle') as HTMLOListElement;

const highScoreListMulti = document.getElementById('highScoreListMulti') as HTMLOListElement;
const finishScreen = document.getElementById('finishScreen') as HTMLDivElement;
const waitingForPlayers = document.getElementById('waitingForPlayers') as HTMLDivElement;

const gameOverButton = document.getElementById('game-over') as HTMLButtonElement;

const pewText = document.getElementById('pew');
const lobbyIDHeadline = document.getElementById('lobbyIDHeadline') as HTMLHeadingElement;
const lobbyID = document.getElementById('lobbyID') as HTMLUListElement;
const playButtonMulti = document.getElementById('playButtonMulti') as HTMLButtonElement;
const playButtonSingle = document.getElementById('playButtonSingle') as HTMLButtonElement;
const userName = document.getElementById('userName') as HTMLInputElement;
const homeScreen = document.getElementById('homescreen') as HTMLDivElement;
const gameScreen = document.getElementById('gameScreen') as HTMLDivElement;
const multiMenyScreen = document.getElementById('multiMenyScreen') as HTMLDivElement;
const joinInputText = document.getElementById('joinInputText') as HTMLInputElement;

const joinAnyLobbyButton = document.getElementById('joinAnyLobby') as HTMLButtonElement;
const createLobbyButton = document.getElementById('createLobby') as HTMLButtonElement;
const joinButton = document.getElementById('join-button') as HTMLButtonElement;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d')!!;

const socket = io.io();

export {
    joinAnyLobbyButton,
    createLobbyButton,
    joinButton,
    canvas,
    context,
    socket,
    userList,
    scoreList,
    highScoreLabel,
    highScoreListSingle,
    highScoreListMulti,
    finishScreen,
    waitingForPlayers,
    gameOverButton,
    pewText,
    lobbyIDHeadline,
    lobbyID,
    playButtonMulti,
    playButtonSingle,
    userName,
    homeScreen,
    gameScreen,
    multiMenyScreen,
    joinInputText,
};
