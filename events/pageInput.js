const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "pageInput") {
      await interaction.reply({
        content: "Your submission was received successfully!",
      });

      const pageInput = interaction.fields.getTextInputValue("pageTitleInput");
      const pageProperties = interaction.fields.getTextInputValue(
        "pagePropertiesInput"
      );
      console.log({ pageInput, pageProperties });
    }
  },
};
