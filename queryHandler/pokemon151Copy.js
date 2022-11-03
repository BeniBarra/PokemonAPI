require('dotenv').config();
const axios = require('axios');

const pokemonQuery = require('./pokemonQuery');
const pokemonNameArray = require('./pokemonNameArray');
const pokemonConstructorCopy = require('./pokemonConstructorCopy');

let cache = require('./cache');

let Pokemon151Copy = async (req, res) => {
    let key = process.env.PKMN_151;
    let objectsKey = process.env.PKMN_OBJECTS;

    if (!cache[key]) {
        console.log('Cache missed')

        let queryData = await pokemonQuery(key);

        if (queryData === undefined){
            res.status(400).send("Grass is too tall, no pokemon were found")   
           } 
        else {

            let pokemonArr = queryData.results;
            
            cache[key] = pokemonArr;
            
            let nameArray = pokemonNameArray(pokemonArr);
            console.log('names array: ' + nameArray);

            pokemonConstructorCopy();

            res.send(cache[objectsKey]);

        }
    } else {
        console.log('Cache hit!')
        res.send(cache[objectsKey]);
    }
};

module.exports = Pokemon151Copy;