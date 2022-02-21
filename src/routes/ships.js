const { findMostPilotedShip } = require('../controllers/ships');
const extractPlanetsFromQuery = require('../middlewares/extractPlanetsFromQuery');
const extractPlanetsFromBody = require('../middlewares/extractPlanetsFromBody');

const router = require('express').Router();

router.get('/', extractPlanetsFromQuery, findMostPilotedShip);

router.post('/', extractPlanetsFromBody, findMostPilotedShip);

module.exports = router;
