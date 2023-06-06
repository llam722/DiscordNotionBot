const { SlashCommandBuilder } = require("discord.js");
const {pageId} = require('../tempPageId')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeselection")
    .setDescription("Removes all selected pages"),
  async execute(interaction) {
  },
};
