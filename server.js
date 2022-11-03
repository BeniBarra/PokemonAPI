const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const getPokemon151 = require('./queryHandler/pokemon151')

const PORT = process.env.PORT || 3002;

let cache = require('./queryHandler/cache');
let objectsKey = process.env.PKMN_OBJECTS;

app.get('', getPokemon151);

app.get('/151', (req, res) => res.send(cache[objectsKey]));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));