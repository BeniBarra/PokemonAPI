require('dotenv').config();
const axios = require('axios');

let queryURL = process.env.PKMN_URL

let PokemonQuery = async (req, res) => 
{
    let response;
    let data;

        req === undefined ? 
        res.status(400).send("Please proivde a URL to Query the API") : 
        response = await axios.get(queryURL + req);
        
        response === undefined ?
        res.status(400).send("Grass is too tall, no pokemon were found") :
        data = response.data;
        
        return data;
};

module.exports = PokemonQuery;