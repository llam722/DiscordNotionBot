const { Events } = require("discord.js");
const { pageId } = require("../tempPageId");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "removeselection") {
      pageId.pop();
      await interaction.reply({
        content: "Last page selection has been removed!",
      });
      console.log(pageId);
    }
  },
};
