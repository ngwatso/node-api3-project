const express = require('express');
const helmet = require('helmet');

const server = express();
const middleware = require('./middleware/middleware');
// const validateUserId = require('./middleware/middleware');

// const validateUser = require('./middleware/middleware');

// const validatePost = require('./middleware/middleware');

// !! remember express by default cannot parse JSON in request bodies
server.use(express.json());
// !! global middlewares and the user's router need to be connected here
server.use(helmet());
server.use(middleware.logger);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
