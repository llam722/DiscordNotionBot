const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });

const updateData = (async () => {
  const pageId = "5f55ed6f-8af6-478e-9257-180878e8e2fe";
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
