//Importing and requiring of libraries and modules
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

//getPokemon151 utilizes the pokeomonQuery, pokemonNameArry, pokemonconstructor, and pokemonClass
const getPokemon151 = require('./queryHandler/pokemon151')
const generateCache = require('./queryHandler/generateCache');

const PORT = process.env.PORT || 3002;

let cache = require('./queryHandler/cache');

let namesKey = process.env.PKMN_NAMES
let objectsKey = process.env.PKMN_OBJECTS;

generateCache();

//--------------------------Routes---------------------------------
app.get('/', getPokemon151);

app.get('/151', (req, res) => res.send(cache[objectsKey]));

app.get('/names', (req, res) => res.send(cache[namesKey]));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));