const discord = require('discord.js');
const axios = require('axios');
const qs = require('querystring');
const { database, emoji } = require('../config.json');

module.exports = {
    name: 'profile',
    description: 'get profile from gdps',
    async execute(msg, args) {
        args = msg.content.split(' ');
        const userName = args[1];

        axios({
            method: 'post',
            url: database + '/getGJUsers20.php',
            data: qs.stringify({
                str: userName,
                page: 0
            })
        }).then((r) => {
            const params = r.data.split(':');
            const accountID = params[19];
            const username = params[1];
            const userID = params[3];
            const stars = params[23];
            const demons = params[27];
            const coins = params[5];
            const userCoins = params[7];
            const creatorPoints = params[25];
            const moons = params[31].split('#')[0];

            const embed = new discord.MessageEmbed()
                .setColor('#92a2ff')
                .setTitle('Profile of ' + userName)
                .setDescription(`${emoji.stars}   stars: \`${stars}\`\n${emoji.moons}   moons: \`${moons}\`\n${emoji.demon}   demons: \`${demons}\`\n${emoji.coin}   coins: \`${coins}\`\n${emoji.userCoin}   user coins: \`${userCoins}\``)
                .setFooter('Requested by ' + msg.author.username);
            msg.channel.send(embed);
        }).catch((e) => {
            console.log(e.message);
        });
    }
}