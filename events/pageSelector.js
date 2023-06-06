const { Events } = require("discord.js");
const { pageId } = require("../tempPageId");
const { Client } = require("@notionhq/client");
const { NOTION_DATABASE_ID, NOTION_KEY } = require('../config.json')

const notion = new Client({ auth: NOTION_KEY });

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    //assigns selected to the chosen value in menu
    const selected = interaction.values[0];
    //logging interaction to see if I can obtain name of values without making another request
    // console.log('interaction', interaction)

    const query = (async () => {
      try {
        const databaseId = NOTION_DATABASE_ID;
        const response = await notion.databases.query({
          database_id: databaseId,
          property: "page",
        });
        const data = response.results.filter(page => page.id === selected)
        const pageName = data[0].properties.Name.title[0].text.content;
        console.log(pageName, 'pageName')
        return data;
      } catch (error) {
        console.log(error, "page does not exist in database");
      }
    })();



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
