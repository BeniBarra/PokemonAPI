//importing dotenv for envoirment variables, and axios for 
require('dotenv').config();

const pokemonQuery = require('./pokemonQuery');
const pokemonNameArray = require('./pokemonNameArray');
const pokemonConstructor = require('./pokemonConstructor');

let cache = require('./cache');

let Pokemon151 = async (req, res) => 
{
    let key = process.env.PKMN_151;
    let objectsKey = process.env.PKMN_OBJECTS;

    if (!cache[key]) 
    {
        console.log('Cache missed')

        let queryData = await pokemonQuery(key);

        if (queryData === undefined)
        {
            res.status(400).send("Grass is too tall, no pokemon were found")   
        } 
        else 
        {
            let pokemonArr = queryData.results;

            cache[key] = pokemonArr;
            
            pokemonNameArray(pokemonArr);

            pokemonConstructor();

            res.send(cache[objectsKey]);
        }
    } 
    else 
    {
        console.log('Cache hit!')
        res.send(cache[objectsKey]);
    }
};

module.exports = Pokemon151;