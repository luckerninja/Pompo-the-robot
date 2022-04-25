const { SlashCommandBuilder } = require('@discordjs/builders');
const dataBaseFunctions = require('../functions/data_base');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('login')
		.setDescription('Log in to the whitelist and get a role')
        .addStringOption(option => option.setName('wallet_symbols').setDescription('the first four characters of the linked wallet').setRequired(true)),
	async execute(interaction) {
        try {
            await dataBaseFunctions.login_whitelist(`${interaction.user.username}#${interaction.user.discriminator}`, interaction.options.get("wallet_symbols").value, interaction)
        } catch (e) {
            console.log(e);
        }
	},
};