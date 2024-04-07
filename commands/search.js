const discord = require('discord.js');
const axios = require('axios');
const qs = require('querystring');
const { database, emoji } = require('../config.json');

module.exports = {
    name: 'search',
    description: 'get level info from gdps',
    async execute(msg, args) {
        args = msg.content.split(' ');
        const levelID = args[1];

        axios({
            method: 'post',
            url: database + '/getGJLevels21.php',
            data: qs.stringify({
                gameVersion: 21,
                    binaryVersion: 35,
                    gdw: 0,
                    type: 0,
                    str: args[1],
                    diff: "-",
                    page: 0,
                    total: 0,
                    uncompleted: 0,
                    onlyCompleted: 0,
                    featured: 0,
                    original: 0,
                    twoPlayer: 0,
                    coins: 0,
                    epic: 0,
                    secret: "Wmdf2893gb7",
                    count: 1
            })
        }).then((r) => {
            const levelData = r.data.split('#')[0].split('|')[0].split(':');
            let ng;
            let likesEmoji = emoji.like;
            let thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/na.png';

            let data = {
                levelID: levelData[1],
                levelName: levelData[3],
                description: levelData[3],
                version: levelData[5],
                playerID: levelData[7],
                difficulty: levelData[9],
                download: levelData[13],
                officialSong: levelData[15],
                gameVersion: levelData[13],
                likes: levelData[19],
                length: levelData[37],
                demon: levelData[17],
                stars: levelData[27],
                featured: levelData[19],
                auto: levelData[25],
                uploadDate: levelData[27],
                updateDate: levelData[29],
                copied: levelData[30],
                twoPlayer: levelData[31],
                customSong: levelData[55],
                coins: levelData[37],
                verifiedCoins: levelData[38],
                epic: levelData[42],
                demondiff: levelData[43],
                objects: levelData[33],
            }

            if(data.likes < 0) {
                likesEmoji = emoji.dislike;
            }

            switch(data.stars) {
                case '1':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/auto.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/auto-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/auto-epic.png'
                    break;
                case '2':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/easy.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/easy-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/easy-epic.png'
                    break;
                case '3':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/normal.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/normal-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/normal-epic.png'
                    break;
                case '4':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/hard4.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/hard4-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/hard4-epic.png'
                    break;
                case '5':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/hard5.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/hard5-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/hard5-epic.png'
                    break;
                case '6':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/harder6.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/harder6-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/harder6-epic.png'
                    break;
                case '7':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/harder7.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/harder7-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/harder7-epic.png'
                    break;
                case '8':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/insane8.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/insane8-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/insane8-epic.png'
                    break;
                case '9':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/insane9.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/insane9-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/insane9-epic.png'
                    break;
                case '10':
                    thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/demon.png';
                    if(data.featured == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/demon-featured.png'
                    if(data.epic == 1) thumbnail = 'https://panel.fhgdps.com/dist/img/gd/difficulties/demon-epic.png'
                    break;
            }

            switch(data.length) {
                case '0':
                    data.length = 'tiny'
                    break;
                case '1':
                    data.length = 'short'
                    break;
                case '2':
                    data.length = 'medium'
                    break;
                case '3':
                    data.length = 'long'
                    break;
                case '4':
                    data.length = 'xl'
                    break;
                case '5':
                    data.length = 'platfrom'
                    break;
                default:
                    data.length = 'Unknown'
            }

            if(data.customSong < 1) {
                switch(data.officialSong) {
                    case '0':
                        ng = '[Stereo Madness](https://www.youtube.com/watch?v=JhKyKEDxo8Q)'
                        break;
                    case '1':
                        ng = '[Back On Track](https://www.youtube.com/watch?v=N9vDTYZpqXM)'
                        break;
                    case '2':
                        ng = '[Polargeist](https://www.youtube.com/watch?v=4W28wWWxKuQ)'
                        break;
                    case '3':
                        ng = '[Dry Out](https://www.youtube.com/watch?v=FnXabH2q2A0)'
                        break;
                    case '4':
                        ng = '[Base After Base](https://www.youtube.com/watch?v=TZULkgQPHt0)'
                        break;
                    case '5':
                        ng = "[Can't Let Go](https://www.youtube.com/watch?v=fLnF-QnR1Zw)"
                        break;
                    case '6':
                        ng = '[Jumper](https://www.youtube.com/watch?v=ZXHO4AN_49Q)'
                        break;
                    case '7':
                        ng = '[Time Machine](https://www.youtube.com/watch?v=zZ1L9JD6l0g)'
                        break;
                    case '8':
                        ng = '[Cycles](https://www.youtube.com/watch?v=KDdvGZn6Gfs)'
                        break;
                    case '9':
                        ng = '[Xstep](https://www.youtube.com/watch?v=PSvYfVGyQfw)'
                        break;
                    case '10':
                        ng = '[Clutterfunk](https://www.youtube.com/watch?v=D5uJOpItgNg)'
                        break;
                    case '11':
                        ng = '[Theory Of Everything](https://www.newgrounds.com/audio/listen/354826)'
                        break;
                    case '12':
                        ng = '[Electroman Adventures](https://www.youtube.com/watch?v=Pb6KyewC_Vg)'
                        break;
                    case '13':
                        ng = '[Clubstep](https://www.newgrounds.com/audio/listen/396093)'
                        break;
                    case '14':
                        ng = '[Electrodynamix](https://www.newgrounds.com/audio/listen/368392)'
                        break;
                    case '15':
                        ng = '[Hexagon Force](https://www.youtube.com/watch?v=afwK743PL2Y)'
                        break;
                    case '16':
                        ng = '[Blast Processing](https://www.youtube.com/watch?v=Z5RufkDHsdM)'
                        break;
                    case '17':
                        ng = '[Theory Of Everything 2](https://www.youtube.com/watch?v=fn98711CEoI)'
                        break;
                    case '18':
                        ng = '[Geometrical Dominator](https://www.youtube.com/watch?v=MQ7vI7cdYJY)'
                        break;
                    case '19':
                        ng = '[Deadlocked](https://www.youtube.com/watch?v=QRGkFkf2r0U)'
                        break;
                    case '20':
                        ng = '[Fingerdash](https://www.youtube.com/watch?v=BuPmq7yjDnI)'
                        break;
                    case '21':
                        ng = '[Dash](https://www.youtube.com/watch?v=SkYv_cIsbV8)'
                        break;
                    default:
                        ng = '[Unknown](https://www.youtube.com/watch?v=oHg5SJYRHA0)'
                        break;
                }
            } else {
                ng = data.customSong;
            }

            const embed = new discord.MessageEmbed()
                    .setTitle(`Information about ${data.levelName}`)
                    .setDescription(`${emoji.info} objects: \`${data.objects}\`\n${likesEmoji} likes: \`${data.likes}\`\n${emoji.downloads} downloads: \`${data.download}\`\n${emoji.length} length: \`${data.length}\`\n:musical_note: songID: ${ng}\n`)
                    .setColor('#92a2ff')
                    .setThumbnail(thumbnail)
                    .setFooter('Requested by ' + msg.author.username);

            msg.channel.send(embed);
        }).catch((e) => {
            console.log(e.message);
        });
    }
}