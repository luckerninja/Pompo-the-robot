const isPermission = async (interaction, role_guild) => {  

    if(interaction.member.roles.cache.some(role => role.name === role_guild)) {
        return true
    }

    interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
    return false

}


module.exports.isPermission = isPermission;