import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

(async () => {
  const pageId = "59833787-2cf9-4fdf-8782-e53db20768a5";
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
})();