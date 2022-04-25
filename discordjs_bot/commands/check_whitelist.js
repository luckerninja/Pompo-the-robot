const { SlashCommandBuilder } = require('@discordjs/builders');
const dataBaseFunctions = require('../functions/data_base');

const config = require("../config.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('check_whitelist')
		.setDescription('Check if you are on the whitelist'),
	async execute(interaction) {

		let arr = await dataBaseFunctions.discord_check(`${interaction.user.username}#${interaction.user.discriminator}`);

            if (arr[0].length != 0) {
 
                interaction.reply({ content: `POMPO have the good news: you have been successfully added to whitelist!
                Your wallet: XXXXXXXXXXXXXXXXX${arr[0][0]['wallet_metamask'].slice(-4)}
                ${config.quote}
                `, ephemeral: true });

            }   else {

                interaction.reply({ content: `Oops, POMPO didn't find anything. ${config.quote}`, ephemeral: true });
                
            }
	},
};