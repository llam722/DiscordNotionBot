const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });

//function returns an array of pageIds
const query = (async () => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.query({
      database_id: databaseId,
      property: "page",
    });
    console.log(response);
    const data = await pageIdArray(response);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error, "page does not exist in database");
  }
});

// helper function to return list of page ids
const pageIdArray = (response) => {
  const list = [];
  for (let i = 0; i < response.results.length; i++) {
    list.push(response.results[i].id);
  }
  return list;
};

//consider this function to just return the page needed instead of returning page id list.
module.exports = { query };
