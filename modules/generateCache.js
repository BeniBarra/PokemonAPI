const axios = require('axios');
require('dotenv').config();

let generateCache = async () => 
{
    await axios.get(process.env.GENERATE_CACHE)

}

module.exports = generateCache;