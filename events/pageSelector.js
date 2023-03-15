const { Events } = require("discord.js");
const { pageId } = require("../tempPageId");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    //assigns selected to the chosen value in menu
    const selected = interaction.values[0];

    if (interaction.customId === "select") {
      await interaction.update({
        content: "Page selected successfully!",
        components: [],
      });
    }
    pageId.push(selected);
    console.log(pageId);
    return selected;
  },
};
