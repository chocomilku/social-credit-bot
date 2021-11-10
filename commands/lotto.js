const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const { rngLuck } = require('../app/rng')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lotto')
        .setDescription('Tests your luck whether you win or lose social credit points'),
    async execute(interaction) {

        const retry = new MessageActionRow()
            .addComponents(
                new MessageButton({ customId: "retry", label: "Retry", style: "SECONDARY", emoji: "🔁" })
            )

        async function send(sent = false) {
            const message = rngLuck()
            const embed = new MessageEmbed({ title: `${message.message}` })
            if (message.win) {
                embed.setColor('AQUA')
            } else if (!message.win) {
                embed.setColor('RED')
            }
            if (!sent) {
                await interaction.reply({ embeds: [embed], components: [retry] })
            } else if (sent) {
                await interaction.editReply({ embeds: [embed], components: [retry] })
            }
        }

        send(false)

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON' });

        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                await i.deferUpdate()
                send(true)
            } else {
                await i.reply({ content: `This button isn't for you!\nYou can run /lotto to run your instance of command`, ephemeral: true })
            }
        })
    }
}
