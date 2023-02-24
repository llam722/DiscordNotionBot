import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

(async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
    // filter: {
    //   or: [
    //     {
    //       property: "In stock",
    //       checkbox: {
    //         equals: true,
    //       },
    //     },
    //     {
    //       property: "Cost of next trip",
    //       number: {
    //         greater_than_or_equal_to: 2,
    //       },
    //     },
    //   ],
    // },
    // sorts: [
    //   {
    //     property: "Last ordered",
    //     direction: "ascending",
    //   },
    // ],
  });
  console.log(response);
})();
