const { SlashCommandBuilder } = require("discord.js");
const tempPageId = require('../tempPageId')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeselection")
    .setDescription("Removes previously selected page"),
  async execute(interaction) {
    tempPageId.pop();
  },
};
