const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

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