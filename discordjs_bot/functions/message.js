const { MessageEmbed } = require('discord.js');
const config = require("../config.json");

const send_message_to_channel = async (interaction, message_id, channel_id, pompom) => {  

    let pompom_in_function = config.quote;

    if(pompom) pompom_in_function = '';

    const message = await interaction.channel.messages.fetch(message_id);
    const channel = await interaction.guild.channels.fetch(channel_id);

    channel.send(`${message.content} ${pompom_in_function}`);
}

const send_embedMessage = async (interaction, message_id, channel_id, color, pompom) => {  
    
    let pompom_in_function = config.quote;

    if(pompom) pompom_in_function = '';

    const message = await interaction.channel.messages.fetch(message_id);
    const channel = await interaction.guild.channels.fetch(channel_id);
    const embed = new MessageEmbed().setColor(color).setDescription(`${message.content} ${pompom_in_function}`);


    channel.send({ embeds: [embed] });
}


module.exports.send_message_to_channel = send_message_to_channel;
module.exports.send_embedMessage = send_embedMessage;