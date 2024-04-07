const discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'send information about bot',
    async execute(msg, args) {
            const embed = new discord.MessageEmbed()
                .setColor('#92a2ff')
                .setTitle('Information')
                .setDescription(`Bot made by lilys\nGitHub: [link](https://github.com/Sy3rena/)`)
                .setFooter('Requested by ' + msg.author.username);
            msg.channel.send(embed);
    }
}
