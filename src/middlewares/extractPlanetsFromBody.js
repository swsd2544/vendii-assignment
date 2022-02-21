module.exports = (req, res, next) => {
	const body = req.body;
	if (!body) {
		const error = new Error('Search body are not valid');
		error.status = 400;
		throw error;
	}

	req.planets = body.search;
	next();
};
