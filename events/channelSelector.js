const { Events } = require("discord.js");
const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require("../config.json");

const notion = new Client({ auth: NOTION_KEY });

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    const selected = interaction.values[0]
    console.log(selected)

    if (interaction.customId === "select") {
      await interaction.update({
        content: "Page was selected!",
        components: [],
      });
    }
  },
};
