require('dotenv').config();
const axios = require('axios');
const PKMNList = process.env.PKMNList;

let cache = require('./cache');

let Pokemon151 = async (req, res) => {
    let key = PKMNList;

    if (!cache[key]) {
        console.log('Cache missed')
        let pokemonAPIList = await axios.get(`${PKMNList}`);
        if (pokemonAPIList === undefined){
            res.status(400).send("Grass is too tall, no pokemon were found")   
           } 
        else {
            let pokemonArr = pokemonAPIList.data.results;
            cache[key] = pokemonArr;
            res.send(cache[key]);
        }
    } else {
        console.log('Cache hit!')
        res.send(cache[key]);
    }
};

module.exports = Pokemon151;