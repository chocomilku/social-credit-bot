require('dotenv').config()

module.exports = {
    env:  {"token": process.env.TOKEN, "clientId": process.env.CLIENTID, "guildId": process.env.GUILDID}
} 
