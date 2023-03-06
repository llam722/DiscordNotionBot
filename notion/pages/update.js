const { Client } = require("@notionhq/client");
const { NOTION_KEY } = require("../../config.json");

const notion = new Client({ auth: NOTION_KEY });

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
