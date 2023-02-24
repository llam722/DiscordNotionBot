import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

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
            name: "In progress",
          },
        },
      },
    
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

addItem("NY, New York");
