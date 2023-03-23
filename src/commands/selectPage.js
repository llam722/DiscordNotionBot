const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selectpage")
    .setDescription("Select Page in Database to be update"),
  async execute(interaction) {

  },
};
