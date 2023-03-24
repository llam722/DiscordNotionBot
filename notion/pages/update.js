const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();
const notion = new Client({ auth: process.env.NOTION_KEY });

const updateData = (async () => {
  const pageId = "83af0783-30f8-4e89-a853-611cc2fe493e";
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
