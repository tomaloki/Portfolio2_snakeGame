import * as express from 'express';
import { LobbyController } from './lobbyController';
import * as path from 'path';
import * as http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:3000',
    },
});

new LobbyController(io);

app.get('/', (request, response) => {
    let testHtmlPath = path.resolve(__dirname, '..', '..', 'index.html');

    response.sendFile(testHtmlPath);
});

app.use(express.static(path.resolve(__dirname, '..', '..', 'assets')));

server.listen(PORT, function () {
    console.log(`Server started on port ${PORT}!`);
});
