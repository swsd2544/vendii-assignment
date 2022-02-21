const axios = require('axios');

const cached = {};

// fetch response from given url. Return data if status ok.
const fetchData = async (url) => {
	const apiResponse = await axios.get(url);
	if (apiResponse.statusText !== 'OK') {
		const error = new Error(url + ' is not available at the moment.');
		error.status = 500;
		throw error;
	}
	return apiResponse.data;
};

// Search for planet.
// If no planets found, throw error, else return top-most planet (most similar name)
const searchPlanetData = async (planetName) => {
	const apiResponseData = await fetchData(
		'https://swapi.dev/api/planets/?search=' + planetName
	);
	if (apiResponseData.count === 0) {
		const error = new Error(`Can't find the planet name "${planet}"`);
		error.status = 400;
		throw error;
	}
	const planetData = apiResponseData.results[0];
	return planetData;
};

const findMostPilotedShip = async (req, res) => {
	const totalShips = {};

	await Promise.all(
		req.planets.map(async (planetName) => {
			if (cached[planetName]) {
				// If found in cached, do nothing
				return;
			}
			const planetData = await searchPlanetData(planetName);
			// planetData store residents in a list
			// { residents: [residentUrl, residentUrl, ...]}
			// Fetch resident data and store in a list
			// [{residentData}, {residentData}, ...]
			const residentsData = await Promise.all(
				planetData.residents.map(
					async (residentUrl) => await fetchData(residentUrl)
				)
			);

			// Since each resident has a list of starships
			// Aggregate all starships into a list.
			// [starshipUrl, starshipUrl, ...]
			const starships = residentsData.reduce(
				(prev, curr) => prev.concat(curr.starships),
				[]
			);
			const starshipsData = await Promise.all(
				starships.map(async (starshipUrl) => await fetchData(starshipUrl))
			);

			const modelFreq = {};
			for (const starship of starshipsData) {
				modelFreq[starship.model] = (modelFreq[starship.model] || 0) + 1;
			}

			cached[planetName] = modelFreq; // Store planet ships in cached
		})
	);

	// Count ships occurence of each given planet
	req.planets.forEach((planetName) => {
		for (const model in cached[planetName]) {
			totalShips[model] = (totalShips[model] || 0) + 1;
		}
	});

	// Find ship model with maximum occurences
	const maxAmountShips = Math.max(...Object.values(totalShips));
	const mostPilotedShips = Object.keys(totalShips).filter(
		(ship) => totalShips[ship] === maxAmountShips
	);

	res.json(mostPilotedShips);
};

module.exports = { findMostPilotedShip };
