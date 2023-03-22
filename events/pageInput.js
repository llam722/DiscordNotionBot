const { Events } = require("discord.js");
const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "pageInput") {
      await interaction.reply({
        content: "Your submission was received successfully!",
      });

      const pageInput = interaction.fields.getTextInputValue("pageTitleInput");
      const pageContent =
        interaction.fields.getTextInputValue("pageContentInput");
      console.log({ pageInput, pageContent });
      addItem(pageInput, pageContent);
    }

    async function addItem(text, pageContent) {
      // console.log(databaseId, 'databaseId')
      try {
        const response = await notion.pages.create({
          parent: { database_id: databaseId },
          properties: {
            title: {
              title: [
                {
                  text: {
                    content: text,
                  },
                },
              ],
            },
            Status: {
              status: {
                name: "Ideas",
              },
            },
            Date: {
              date: {
                start: toIsoString(new Date()),
              },
            },
          },
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: pageContent,
                    },
                  },
                ],
              },
            },
          ],
        });
        console.log("response", response);
        console.log("Success! Entry added.");
      } catch (error) {
        console.error(error.body);
      }
    }

    //helper function to convert ISOString into user's local timezone
    function toIsoString(date) {
      let tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? "+" : "-",
        pad = function (num) {
          return (num < 10 ? "0" : "") + num;
        };

      return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        "T" +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":" +
        pad(date.getSeconds()) +
        dif +
        pad(Math.floor(Math.abs(tzo) / 60)) +
        ":" +
        pad(Math.abs(tzo) % 60)
      );
    }
  },
};
