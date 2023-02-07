const SocketEvents = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',

    GAME_OVER: 'game-over',

    LOBBY_START_SINGLE: 'lobby-start-single',
    LOBBY_START_MULTI: 'lobby-start-multi',

    DIFFICULTY_HIGHER: 'difficulty-higher',

    NEW_DIRECTION: 'new-direction',
    REMOVE_LASER: 'remove-laser',
    SEND_PEWPEW: 'send-pewpew',
    USERNAME: 'userName',

    JOIN_ANY_LOBBY: 'join-any-lobby',
    JOIN_SINGLE_GAME: 'join-single-game',
    CREATE_LOBBY_MULTI: 'create-lobby-multi',
    FOUND_LOBBY: 'found-lobby',
    JOIN_LOBBY: 'join-lobby',
    LOBBY_JOINED: 'lobby-joined',
    LOBBY_NOT_EXIST: 'lobby-not-exist',

    UPDATE_GAME: 'update-game',

    GAME_START_MULTI: 'game-start-multi',
    GAME_START_SINGLE: 'game-start-single',
    GAME_END: 'game-end',
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    ENOUGH_PLAYERS: 'enough-players',

    CREATED_SINGLE_GAME: 'created-single-game',
    CREATED_MULTI_GAME: 'created-multi-game',

    PEWPEWPEW: 'pewpewpew',
};

export { SocketEvents };
