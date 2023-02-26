const { Client } = require("@notionhq/client");
const { NOTION_KEY } = require("./config.json");

const notion = new Client({ auth: NOTION_KEY });

(async () => {
  const blockId = "4a5330c5-8cb7-4cf0-af55-49f1e6af2bf9";
  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Lacinato kale",
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
                content:
                  "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
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
  console.log(response);
})();
