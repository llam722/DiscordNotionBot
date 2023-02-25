const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require("../../config.json");

const notion = new Client({ auth: NOTION_KEY });

export const updateData = (async () => {
  const pageId = "59833787-2cf9-4fdf-8782-e53db20768a5";
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      "In stock": {
        checkbox: true,
      },
    },
  });
  console.log(response);
})();