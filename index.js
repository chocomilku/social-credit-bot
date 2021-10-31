const { Client, Intents, Collection } = require('discord.js')
const { env } = require('./globals')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], presence: {status: 'online', activities: [{name: 'Social Credit Test', type: 'PLAYING'}]} })

client.once('ready', () => { console.log(`Ready!\n${client.user.tag} is Online!\nCTRL+C to Stop this bot`) })

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands')
  .filter(file => 
    file.endsWith('.js')
    )

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const command = client.commands.get(interaction.commandName)
  
    if (!command) return
  
    try {
      await command.execute(interaction);
    } catch (error) {
      const d = new Date();
      console.error(`${d.toLocaleString()}: ${error}`)
      const embedError = new MessageEmbed()
        .setColor('RED')
        .setTitle(`${error}`)
        .setTimestamp(d)
      await interaction.Reply({ content: `An Error has Occured. Please try again`, embeds: [embedError]})
    }
  })

client.login(env.token)