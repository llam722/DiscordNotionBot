const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { pageId } = require("../tempPageId");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addblock")
    .setDescription("Adds content block to the page"),

  async execute(interaction) {
    if (!pageId[0]) {
      await interaction.reply(
        'Select a page to update first (use "/selectpage")!'
      );
    } else {
      const modal = new ModalBuilder()
        .setCustomId("blockInput")
        .setTitle("Adds a block");

      // Add components to modal

      // Create the text input components
      const blockHeaderInput = new TextInputBuilder()
        .setCustomId("blockHeaderInput")
        // The label is the prompt the user sees for this input
        .setLabel("Input heading here")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

      const blockContentInput = new TextInputBuilder()
        .setCustomId("blockContentInput")
        .setLabel("Input content here")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);

      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(
        blockHeaderInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        blockContentInput
      );

      // Add inputs to the modal
      modal.addComponents(firstActionRow, secondActionRow);

      //Show the modal to the user
      await interaction.showModal(modal);
    }
  },
};
