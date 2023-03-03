const { Events } = require("discord.js");
const { Client } = require("@notionhq/client");
const { NOTION_KEY } = require("../config.json");
const notion = new Client({ auth: NOTION_KEY });


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
      addItem(blockHeader, blockContent);
    }

    async function addItem(blockHeader, blockContent) {
      const blockId = "5f55ed6f-8af6-478e-9257-180878e8e2fe";
      const response = await notion.blocks.children.append({
        block_id: blockId,
        children: [
          {
            heading_2: {
              rich_text: [
                {
                  text: {
                    content: blockHeader,
                  },
                },
              ],
            },
          },
          {
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: blockContent,
                    link: {
                      url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                    },
                  },
                },
              ],
            },
          },
        ],
      });
      console.log(response, "block content added to page!");
    };
  },
};
