import { ActionRowBuilder, ChatInputCommandInteraction } from "discord.js";

const {
  ChatInputCommandInteraction
  ActionRowBuilder,
  Events,
  StringSelectMenuBuilder,
} = require("discord.js");
const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require('../config.json')

// const dotenv = require("dotenv");
// dotenv.config();

const notion = new Client({ auth: NOTION_KEY });

interface List {
  label: string,
  description: string,
  value: string
}

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    
    // helper function to return list of page ids
    const pageIdArray = (response: { results: string | any[]; }): List[] => {
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

    
    const query = (async (): Promise<List[] | void> => {
      try {
        const databaseId: string = NOTION_DATABASE_ID;
        const response = await notion.databases.query({
          database_id: databaseId,
          property: "page",
        });
        const data = await pageIdArray(response);
        if(data) return data;
      } catch (error) {
        console.log(error, "page does not exist in database");
      }
    })();


    if (interaction.commandName === "selectpage") {
      const databasePages = [query];

      const row: ActionRowBuilder = new ActionRowBuilder().addComponents(
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
