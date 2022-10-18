const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const getPokemon151 = require('./queryHandler/pokemon151')

const PORT = process.env.PORT || 3002;
const PKMNLIST = process.env.PKMNLIST;
const PKMN = process.env.PKMN;

app.get('/', (req,res) => {
    res.send('This PokemonAPI server is LIVE!')
});

app.get('/151', (getPokemon151));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));