const { Events } = require("discord.js");
const { Client } = require("@notionhq/client");
const dotenv = require("dotenv")
dotenv.config()
const notion = new Client({ auth: process.env.NOTION_KEY });
const { pageId } = require("../tempPageId");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.customId === "blockInput") {
      await interaction.reply({
        content: "Your submission was received successfully!",
      });

      const blockHeader =
        interaction.fields.getTextInputValue("blockHeaderInput");
      const blockContent =
        interaction.fields.getTextInputValue("blockContentInput");
      console.log({ blockHeader, blockContent });
      //appends the new content to the current page after grabbing the fields from the interaction above
      addItem(blockHeader, blockContent);
    }

    async function addItem(blockHeader, blockContent) {
      const blockId = pageId[0];
      if (!blockId)
        return await interaction.reply(
          'No page selected. Please select a page using "/selectpage" before using this command.'
        );
      console.log(blockId, "blockId");
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
                    // link: {
                    //   url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                    // },
                  },
                },
              ],
            },
          },
        ],
      });
      console.log(response, "block content added to page!");
      pageId.shift();
      console.log(pageId);
    }
  },
};
