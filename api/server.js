const express = require('express');
const helmet = require('helmet');

const server = express();
const router = require('./users/users-router');
const Middleware = require('./middleware/middleware');

// !! remember express by default cannot parse JSON in request bodies.
server.use(express.json());
// !! global middlewares and the user's router need to be connected here.
server.use(helmet());
server.use(Middleware.logger);

server.use('/api/users', router);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
