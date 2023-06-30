"use strict";

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = require('../app');
const http = require('http');
const port = 8081;

app.use(session({
    secret: 'blackzat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

const server = http.createServer(app);
// const socketio = require('../middleware/socketio');

server.listen(port, () => {
    console.log('Server on', port);
});

// socketio(server);