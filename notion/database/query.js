const { Client } = require("@notionhq/client");
const { NOTION_KEY, NOTION_DATABASE_ID } = require("../../config.json");

const notion = new Client({ auth: NOTION_KEY });

//function returns an array of pageIds
(async () => {
  const databaseId = NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const data = await pageIdArray(response);
  console.log(data)
  return data
})();


// helper function to return list of pages
const pageIdArray = (response) => {
  const list = [];
  for (let i = 0; i < response.results.length; i++){
    list.push(response.results[i].id);
  }
  return list;
}
