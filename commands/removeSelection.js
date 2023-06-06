const { SlashCommandBuilder } = require("discord.js");
const {pageId} = require('../tempPageId')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeselection")
    .setDescription("Removes previously selected page"),
  async execute(interaction) {
    pageId.pop();
  },
};
