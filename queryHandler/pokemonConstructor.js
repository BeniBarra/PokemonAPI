require('dotenv').config();
const axios = require('axios');

let cache = require('./cache')


let key = 'pokemonObj';

class Pokemon {
    constructor(name, id, moves, sprites, description, stats, types){
        this.name = name;
        this.id = id;
        this.moves = moves;
        this.sprites = sprites;
        this.description = description;
        this.stats = stats;
        this.types = types;
    }
}

let pokemonConstructor = async (req, res) => {
    if(!cache[key]){
        console.log('Constructor Cache Miss');

        let pokemonFromCache = cache['pokemon151'];

        let newPokemonArr = [];
    
        let counter = 0;
    
        pokemonFromCache.forEach( async (data) => {
            
            let queryData = await axios.get(data.url);

            let pokemonData = queryData.data;

            let descriptionQueryData = await axios.get(queryData.data.species.url);
    
            let descriptionData = descriptionQueryData.data;
    
            //console.log(pokemonData);
    
            let pokemonName = pokemonData.name;
    
            let pokemonId = pokemonData.id;
    
            let pokemonMoves = pokemonData.moves.map((moves) => moves.move.name);
    
            let pokemonSprites = pokemonData.sprites.other['official-artwork'].front_default;

            let pokemonDescription = descriptionData.flavor_text_entries[0].flavor_text.replace(/[\r\n\f]/gm, ' ');
    
            let pokemonStats = pokemonData.stats.map((stats) => ({name: stats.stat.name, baseStat: stats.base_stat}));
    
            let pokemonTypes = pokemonData.types.map((types) => ({name: types.type.name}));
    
            const newPokemon = new Pokemon(pokemonName, pokemonId, pokemonMoves, pokemonSprites, pokemonDescription, pokemonStats, pokemonTypes);
        
            newPokemonArr.push(newPokemon);
            counter++;
    
            if(counter == pokemonFromCache.length) {
                newPokemonArr.sort((a,b) => (a.id > b.id) ? 1 : -1);
                cache[key] = newPokemonArr;
                console.log(cache[key]);
                res.send(cache[key]);
            }
        });
    } else {
        console.log('Constructor Cache Hit');
        res.send(cache[key]);
    }
}


module.exports = pokemonConstructor;