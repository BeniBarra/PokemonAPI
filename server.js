//Importing and requiring of libraries and components
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const axios = require('axios');
require('dotenv').config();

//getPokemon151 utilizes the pokeomonQuery, pokemonNameArry, pokemonconstructor, and pokemonClass
const getPokemon151 = require('./queryHandler/pokemon151')

const PORT = process.env.PORT || 3002;

let cache = require('./queryHandler/cache');

let namesKey = process.env.PKMN_NAMES
let objectsKey = process.env.PKMN_OBJECTS;

//--------------------------Routes---------------------------------
app.get('/', getPokemon151);

// querySelf = async () => {
//     await axios.get(process.env.BACK_END);
// }

// querySelf();

app.get('/151', (req, res) => res.send(cache[objectsKey]));

app.get('/names', (req, res) => res.send(cache[namesKey]));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));