const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong and latency(ms)!"),

  async execute(interaction) {
    // await interaction.reply("Pong!");
  
  },
};
