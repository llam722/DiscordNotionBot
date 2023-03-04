const {
  ActionRowBuilder,
  Events,
  StringSelectMenuBuilder,
} = require("discord.js");
const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require("../config.json");

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
        // console.log(response.results[0].properties.Name.title[0].text.content);
        // console.log(response.results[0]);
        const data = await pageIdArray(response);
        // databasePages = data;
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error, "page does not exist in database");
      }
    })();

    // helper function to return list of page ids
    const pageIdArray = (response) => {
      const list = [];
      for (let i = 0; i < response.results.length; i++) {
        list.push({
          label: response.results[i].properties.Name.title[0].text.content,
          description: response.results[i].url,
          value: response.results[i].id,
        });
      }
      return list;
    };

    if (interaction.commandName === "test") {
      const databasePages = await query;
      // console.log(databasePages);

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
