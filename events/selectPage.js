const {
  ActionRowBuilder,
  Events,
  StringSelectMenuBuilder,
} = require("discord.js");
const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require('../config.json')

// const dotenv = require("dotenv");
// dotenv.config();

const notion = new Client({ auth: NOTION_KEY });

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const query = (async () => {
      try {
        const databaseId = NOTION_DATABASE_ID;
        const response = await notion.databases.query({
          database_id: databaseId,
          property: "page",
        });
        const data = await pageIdArray(response);
        return data;
      } catch (error) {
        console.log(error, "page does not exist in database");
      }
    })();

    // helper function to return list of page ids
    const pageIdArray = (response) => {
      const list = [];
      for (let i = 0; i < response.results.length; i++) {

        const pageTitle =
          response.results[i].properties.Name.title[0].text.content;
        const pageUrl = response.results[i].url
        const pageId = response.results[i].id
        
        list.push({
          label: pageTitle,
          description: pageUrl,
          value: pageId,
        });
      }
      return list;
    };

    if (interaction.commandName === "selectpage") {
      const databasePages = await query;
      // console.log(databasePages)

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("select")
          .setPlaceholder("Nothing selected")
          .addOptions(...databasePages)
      );

      await interaction.reply({
        content: "Select page in database to update!",
        components: [row],
      });
    }
  },
};
