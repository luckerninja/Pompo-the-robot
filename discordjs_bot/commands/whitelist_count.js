const { SlashCommandBuilder } = require('@discordjs/builders');
const dataBaseFunctions = require('../functions/data_base');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitelist_count')
		.setDescription('Send count of whitelist members'),
	async execute(interaction) {
		const conn = await dataBaseFunctions.DB_connect(interaction);
        const query = "SELECT * FROM `whitelist`";
        
        result = await conn.execute(query);

		interaction.reply({ content: `Count of members is: ${result[0].length}`, ephemeral: true });

	},
};