const axios  = require("axios")

let generateCache = async () => 
{
    await axios.get(process.env.BACK_END)
}

module.exports = generateCache;