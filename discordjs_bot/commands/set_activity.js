const { SlashCommandBuilder } = require('@discordjs/builders');
const { isPermission } = require('../functions/isPermission');
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_activity')
		.setDescription('set activity for bot')
        .addStringOption(option => option.setName('activity').setDescription('set activity for bot').setRequired(true))
        .addStringOption(option => option.setName('type_activity').setDescription('WATCHING/STREAMING/COMPETING/PLAYING/LISTENING').setRequired(true)),


	async execute(interaction) {
              
			if(!await isPermission(interaction, '@pompo')) return;

            interaction.client.user.setActivity(interaction.options.get('activity').value, { type: interaction.options.get('type_activity').value });

			interaction.reply({ content: `Activity set. ${config.quote}`, ephemeral: true });
	
	},
};
