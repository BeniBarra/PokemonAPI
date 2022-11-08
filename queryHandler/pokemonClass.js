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

module.exports = Pokemon;