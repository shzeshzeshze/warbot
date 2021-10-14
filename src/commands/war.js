const { SlashCommandBuilder } = require('@discordjs/builders');
const { settlements } = require('../settlements.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('war')
    .setDescription('Replies with upcoming war information')
    .addStringOption(option => {
      return option.setName('settlement')
        .setDescription('Provide a settlement abbreviation')
        .setRequired(false)
        .addChoice('Brightwood', 'BW')
        .addChoice('Cutlass Keys', 'CK')
        .addChoice('Ebonscale Reach', 'ER')
        .addChoice('Everfall', 'EF')
        .addChoice('First Light', 'FL')
        .addChoice('Monarch\'s Bluff', 'MB')
        .addChoice('Mourningdale', 'MD')
        .addChoice('Reekwater', 'RW')
        .addChoice('Restless Shore', 'RS')
        .addChoice('Weaver\'s Fen', 'WF')
        .addChoice('Windsward', 'WW');
    }),
  async execute(interaction) {
    const choice = interaction.options.getString('settlement');

    const {
      name: {
        long: settlementLongName,
      },
    } = settlements.find(s => s.name.short === choice);

    await interaction.reply(`
      Retrieving war information for **${settlementLongName}**!
    `);
  },
};
