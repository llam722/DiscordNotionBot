const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require("../../config.json");

const notion = new Client({ auth: NOTION_KEY });

(async () => {
  const databaseId = NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  console.log(response);
})();
