
<h1 align='center'>DiscordNotion</h1>

<h3>DiscordNotion is a Notion Integration paired with a Discord Bot, allowing you to create pages in your Notion database and update from Discord accordingly.</h3>
<br/>

<h4>
In order to ensure smooth setup, follow the steps below from the Notion documentation to allow database access for this integration:
</h4>

<ol>
<li>Go to the database page in your workspace.</li>
<li>Click the &nbsp; <b>•••</b> &nbsp; on the top right corner of the page.</li>
<li>At the bottom of the pop-up, click <b>Add connections.</b> </li>
<li>Search for and select your integration in the <b>Search for connections ... </b> &nbsp; menu.</li>
</ol>


Create a file named config.json with an empty object and obtain your database ID to allow updating of the correct database. <br> 
<b>OR</b>
Create a .env file in the root of your project to be imported and configured.

<br>Click the <b>Share</b> icon then select <b>Copy Link</b> to extract the URL, where we will get the database ID from. 
<br>
See attached image from Notion docs.

<img src='./databaseId.png'></img>

Save this database ID as the value for the key, (NOTION_DATABASE_ID if using config.json) to be exported to other files.

You will also need the clientId in order to access the Discord channels that you are a moderator of. You can obtain this by going to the <a href='https://discord.com/developers/applications'>Discord Developer Console<a>.