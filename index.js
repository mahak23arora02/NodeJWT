const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {
	//Mock User

	const user = {
		id: 1,
		username: 'mahak',
		password: '3000',
	};
	jwt.sign({ user: user }, 'anybody',{ expiresIn:'30s'}, (err, token) => {
		// { expiresIn: '20s' }
		res.json({ token: token });
	});
});

app.post('/api/dashboard', verifyToken, (req, res) => {
	jwt.verify(req.token, 'anybody', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			//console.log('hello');
			res.json({
				message: 'Post Created!!',
			});
		}
	});
});
function verifyToken(req, res, next) {
	//Get auth Header
	const bearerHeader = req.headers['authorization'];
	//check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		//split all the space(convert string into array)
		const bearer = bearerHeader.split(' ');
		//Get the token
		const bearerToken = bearer[1];
		//Set the token
		req.token = bearerToken;
		//next middleware
		next();
	} else {
		res.sendStatus(403);
	}
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
