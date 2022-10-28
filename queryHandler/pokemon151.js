require('dotenv').config();
const axios = require('axios');
const PKMNList = process.env.PKMNList;

const pokemonNameArray = require('./pokemonNameArray');

let cache = require('./cache');

let Pokemon151 = async (req, res) => {
    let key = 'pokemon151';

    if (!cache[key]) {
        console.log('Cache missed')

        let pokemonAPIList = await axios.get(`${PKMNList}`);

        if (pokemonAPIList === undefined){
            res.status(400).send("Grass is too tall, no pokemon were found")   
           } 
        else {

            let pokemonArr = pokemonAPIList.data.results;
            
            cache[key] = pokemonArr;
            
            let nameArray = pokemonNameArray(pokemonArr);
            
            console.log(nameArray);
            res.send(cache['pokemonNames']);

        }
    } else {
        console.log('Cache hit!')
        res.send(cache['pokemonNames']);
    }
};

module.exports = Pokemon151;