const express = require('express');

// !! You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// !! The middleware functions also need to be required
const Middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
	// ** RETURN AN ARRAY WITH ALL THE USERS
	Users.get(req.query)
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Error retrieving users' });
		});
});

router.get('/:id', Middleware.validateUserId, (req, res) => {
	// ** RETURN THE USER OBJECT
	// ** this needs a middleware to verify user id
	try {
		const user = req.user;
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ Error: err });
	}
});

router.post('/', Middleware.validateUser, async (req, res) => {
	// ** RETURN THE NEWLY CREATED USER OBJECT
	// ** this needs a middleware to check that the request body is valid
	const user = req.body;

	try {
		const newUser = await Users.insert(user);
		res.status(201).json(newUser);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			meggage:
				'There was an error while saving the user to the database',
		});
	}
});

router.put(
	'/:id',
	Middleware.validateUserId,
	Middleware.validateUser,
	(req, res) => {
		// ** RETURN THE FRESHLY UPDATED USER OBJECT
		// ** this needs a middleware to verify user id
		// ** and another middleware to check that the request body is valid
	}
);

router.delete('/:id', Middleware.validateUserId, (req, res) => {
	// ** RETURN THE FRESHLY DELETED USER OBJECT
	// ** this needs a middleware to verify user id
});

router.get('/:id/posts', Middleware.validateUserId, (req, res) => {
	// ** RETURN THE ARRAY OF USER POSTS
	// ** this needs a middleware to verify user id
	Users.getUserPosts(req.params.id)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({
					message:
						'No post information for this user could be found',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Error retrieving posts' });
		});
});

router.post('/:id/posts', Middleware.validateUserId, (req, res) => {
	// ** RETURN THE NEWLY CREATED USER POST
	// ** this needs a middleware to verify user id
	// ** and another middleware to check that the request body is valid
});

// !! do not forget to export the router
module.exports = router;
