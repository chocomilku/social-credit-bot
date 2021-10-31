const { Client, Intents } = require('discord.js')
const { env } = require('./globals')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], presence: {status: 'online', activities: [{name: 'Social Credit Test', type: 'PLAYING'}]} })

client.once('ready', () => { console.log(`Ready!\n${client.user.tag} is Online!\nCTRL+C to Stop this bot`) })

client.login(env.token)