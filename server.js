//Importing required libraries and modules
const express = require('express');
const app = express();

//cross-origin recourse sharing set for all responses
const cors = require('cors');
app.use(cors());

//for envoirment variables
require('dotenv').config();

//getPokemon151 utilizes the pokeomonQuery, pokemonNameArry, pokemonconstructor, and pokemonClass
const getPokemon151 = require('./modules/pokemon151')
const generateCache = require('./modules/generateCache');

const PORT = process.env.PORT || 3002;

let cache = require('./modules/cache');

//Assigning environment variables for querying the server cache
let namesKey = process.env.PKMN_NAMES
let objectsKey = process.env.PKMN_OBJECTS;

generateCache();
//--------------------------Routes---------------------------------

// returns the object of pokemon objects
app.get('/', getPokemon151);

// returns the object of pokemon objects
app.get('/151', (req, res) => res.send(cache[objectsKey]));

// returns the object of pokemon names ascending pokemon number order
app.get('/names', (req, res) => res.send(cache[namesKey]));

// assigning port that server is listening on and recieving requests through
app.listen(PORT, () => console.log(`Listening on ${PORT}`));