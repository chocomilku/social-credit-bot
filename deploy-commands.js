const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { env } = require('./globals')

const commands = []
const commandFiles = fs.readdirSync('./commands')
  .filter(file => 
    file.endsWith('.js')
    )

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(env.token);

(async () => {
	try {
		console.log('Started registering Slash commands.');

		await rest.put(
			Routes.applicationGuildCommands(env.clientId, env.guildId),
			{ body: commands },
		);

		console.log('Successfully registered Slash commands.');
	} catch (error) {
		console.error(error);
	}
})()