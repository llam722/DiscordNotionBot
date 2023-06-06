const { SlashCommandBuilder } = require("discord.js");
const tempPageId = require('../tempPageId')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeSelection")
    .setDescription("Removes previously selected page"),
  async execute(interaction) {
    tempPageId.pop();
  },
};
