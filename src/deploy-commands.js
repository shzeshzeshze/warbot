require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes} = require('discord-api-types/v9');
const { paths } = require('./paths.js');

const {
  BOT_TOKEN,
  CLIENT_ID,
  GUILD_ID,
} = process.env;

const commands = [];
const commandFiles = fs.readdirSync(paths.commands).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`${paths.commands}/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({
  version: '9',
}).setToken(BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
  body: commands,
}).then(() => console.log('Succcessfully registered commands.'))
  .catch(console.error);
