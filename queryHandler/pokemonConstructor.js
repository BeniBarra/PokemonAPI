// The main goal of this function is to take the query information from the
// pokeapi and filter out all the information we don't need, and then modifying
// the information we require and passing it into a pokemon constructor to create 
// individual objects for each pokemon to send as a renderable package to our front end

require('dotenv').config();
const axios = require('axios');

let cache = require('./cache')


let key = process.env.PKMN_OBJECTS;
let resultsKey = process.env.PKMN_151;

let Pokemon = require('./pokemonClass');

let pokemonConstructor = async (req, res) => {
    if(!cache[key]){
        console.log('Constructor Cache Miss');
        //console.log(resultsKey);

        let pokemonFromCache = cache[resultsKey];

        let newPokemonArr = [];
    
        let counter = 0;
    
        pokemonFromCache.forEach( async (data) => {
            
            let queryData = await axios.get(data.url);

            let pokemonData = queryData.data;

            let descriptionQueryData = await axios.get(queryData.data.species.url);
    
            let descriptionData = descriptionQueryData.data;
    
            //console.log(pokemonData);

            let newName = '';
            for(let i = 0 ; i < pokemonData.name.length ; i++ ) {
                i == 0 ? 
                newName += pokemonData.name[i].toUpperCase() : 
                newName += pokemonData.name[i];
            }
    
            let pokemonName = newName;
    
            let pokemonId = pokemonData.id;
    
            let pokemonMoves = pokemonData.moves.map((moves) => moves.move.name.toUpperCase());
    
            let pokemonSprites = pokemonData.sprites.other['official-artwork'].front_default;

            let pokemonDescription = descriptionData.flavor_text_entries[0].flavor_text.replace(/[\r\n\f]/gm, ' ').toUpperCase();
    
            let pokemonStats = pokemonData.stats.map((stats) => ({name: stats.stat.name.toUpperCase(), baseStat: stats.base_stat}));
    
            let pokemonTypes = pokemonData.types.map((types) => ({name: types.type.name.toUpperCase()}));
    
            const newPokemon = new Pokemon(pokemonName, pokemonId, pokemonMoves, pokemonSprites, pokemonDescription, pokemonStats, pokemonTypes);
        
            newPokemonArr.push(newPokemon);
            counter++;
    
            if(counter == pokemonFromCache.length) {
                newPokemonArr.sort((a,b) => (a.id > b.id) ? 1 : -1);
                cache[key] = newPokemonArr;
                //console.log(cache[key]);
                return cache[key];
            }
        });
    } else {
        console.log('Constructor Cache Hit');
        return cache[key];
    }
}


module.exports = pokemonConstructor;