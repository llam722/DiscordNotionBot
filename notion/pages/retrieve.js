const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });

(async () => {
  const pageId = "4a5330c5-8cb7-4cf0-af55-49f1e6af2bf9";
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
})();
