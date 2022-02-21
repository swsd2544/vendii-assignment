const express = require('express');

const app = express();

app.use(express.json());

app.use('/ships', require('./routes/ships'));

app.use((err, req, res, next) => {
	const message = err.message || 'Internal server error';
	const status = err.status || 500;
	res.status(status).json({ message });
});

app.listen(3000, () => {
	console.log('The server is running on port 3000');
});
