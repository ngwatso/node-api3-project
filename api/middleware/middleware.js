const User = require('../users/users-model');

function logger(req, res, next) {
	// ** DO YOUR MAGIC
	// console.log(`${timestamp}${req.method} to ${req.URL} `);
	console.log(
		`[${new Date().toISOString()}] ${req.method} to ${
			req.url
		} from ${req.get('Origin')}`
	);
	next();
}

async function validateUserId(req, res, next) {
	// ** DO YOUR MAGIC
	const { id } = req.params;
	try {
		const user = await User.getById(id);
		if (user) {
			req.user = user;
			next();
		} else {
			next({ ...Error(), status: 404, message: 'invalid id' });
		}
	} catch (err) {
		next({ ...err, status: 500, message: 'error processing request' });
	}
}

function validateUser(req, res, next) {
	// ** DO YOUR MAGIC
}

function validatePost(req, res, next) {
	// ** DO YOUR MAGIC
}

// !! do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
