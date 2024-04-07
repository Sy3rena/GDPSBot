const discord = require('discord.js');
const fs = require('fs');
const axios = require('axios');
const qs = require('querystring');
const { token, prefix } = require('./config.json');

const client = new discord.Client({ disableEveryone: true });
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(e => e.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    client.user.setPresence({
        status: 'idle',
        activity: {
            name: 'Тушёнка',
            type: 'PLAYING',
        }
    });

    console.log('Bot started at ' + client.user.username);
});

client.on('message', (msg) => {
    new discord.MessageEmbed
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('command error');
    }
});

client.login(token);