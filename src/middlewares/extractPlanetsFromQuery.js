module.exports = (req, res, next) => {
	const planetsText = req.query.search;
	console.log(req.query.search);
	if (!planetsText) {
		const error = new Error('Search queries are not valid');
		error.status = 400;
		throw error;
	}

	req.planets = planetsText.split(',');
	next();
};
