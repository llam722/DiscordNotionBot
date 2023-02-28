const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addpage")
    .setDescription("Adds page to the database"),

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("pageInput")
      .setTitle("Add a Page");

    // Add components to modal

    // Create the text input components
    const pageTitleInput = new TextInputBuilder()
      .setCustomId("pageTitleInput")
      // The label is the prompt the user sees for this input
      .setLabel("Input title here")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short);

    const pagePropertiesInput = new TextInputBuilder()
      .setCustomId("pagePropertiesInput")
      .setLabel("Input properties here")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(
      pageTitleInput
    );
    const secondActionRow = new ActionRowBuilder().addComponents(
      pagePropertiesInput
    );

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    //Show the modal to the user
    await interaction.showModal(modal);
  },
};
