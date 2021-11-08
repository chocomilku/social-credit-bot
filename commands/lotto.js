const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const { rngLuck } = require('../app/rng')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lotto')
        .setDescription('Tests your luck whether you win or lose social credit points'),
    async execute(interaction) {
        const message = rngLuck()
        const embed = new MessageEmbed({ title: `${message.message}` })
        const retry = new MessageActionRow()
            .addComponents(
                new MessageButton({ customId: "retry", label: "Retry", style: "SECONDARY", emoji: "🔁" })
            )
        if (message.win) {
            embed.setColor('AQUA')
        } else if (!message.win) {
            embed.setColor('RED')
        }
        await interaction.reply({ embeds: [embed], components: [retry] })
    }
}
