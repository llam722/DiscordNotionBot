const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require("../config.json");

const notion = new Client({ auth: NOTION_KEY });

const databaseId = NOTION_DATABASE_ID;

async function addItem(text) {
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
                  content:
                    "You made this page using the Notion API from Discord Messages. Pretty cool, huh? We hope you enjoy building with us.",
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

addItem(pageInput);

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
