const { Events } = require("discord.js");
const { pageId } = require("../tempPageId");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    //assigns selected to the chosen value in menu
    const selected = interaction.values[0];
    //logging interaction to see if I can obtain name of values without making another request
    console.log('interaction', interaction)

    if (interaction.customId === "select") {
      await interaction.update({
        content: `Page: ${selected} selected successfully!`,
        components: [],
      });
    }
    //adds selected value into the array for temporary storage
    pageId.push(selected);
    console.log(pageId);
    return selected;
  },
};
