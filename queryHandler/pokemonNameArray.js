
let cache = require('./cache');

let PokemonNameArray = (pokemonObjArr) => 
{
    let key = process.env.PKMN_NAMES

    let pokemonNameArr = []
    
    pokemonObjArr.forEach( pokemon => 
    {
        let originalName = pokemon.name
        let newName = '';

        for(let i = 0 ; i < originalName.length ; i++ ) 
        {
            i == 0 ? 
            newName += originalName[i].toUpperCase() : 
            newName += originalName[i];
        }
        pokemonNameArr.push(newName);
    });

    //console.log(pokemonNameArr);
    cache[key] = pokemonNameArr;
    return pokemonNameArr;
};

module.exports = PokemonNameArray;