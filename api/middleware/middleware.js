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
	if (req.body && Object.keys(req.body).length > 0) {
		next();
	} else if (!req.body.name) {
		next({
			...Error(),
			status: 400,
			message: 'missing required name field',
		});
		// res.status(400).json({ message: 'missing required name field' });
	} else {
		next({ ...Error(), status: 400, message: 'missing user data' });
		// res.status(400).json({ message: 'missing user data' });
	}
}

function validatePost(req, res, next) {
	// ** DO YOUR MAGIC
	if (req.body && Object.keys(req.body).length > 0) {
		next();
	} else if (!req.body.text) {
		next({ ...Error(), status: 400, message: 'missing post data' });
	} else {
		next({
			...Error(),
			status: 400,
			message: 'missing required text field',
		});
	}
}

// !! do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
