const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();
const notion = new Client({ auth: process.env.NOTION_KEY });

const updateData = (async () => {
  const pageId = "e71d8ae1-7f95-44d8-8c1e-287e626c54ad";
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      Status: {
        status: {
          name: "Done",
        },
      },
    },
  });
  console.log(response);
})();
