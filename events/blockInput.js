const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "blockInput") {
      await interaction.reply({
        content: "Your submission was received successfully!",
      });

      const blockHeader =
        interaction.fields.getTextInputValue("blockHeaderInput");
      const blockContent =
        interaction.fields.getTextInputValue("blockContentInput");
      console.log({ blockHeader, blockContent });
    }
  },
};
