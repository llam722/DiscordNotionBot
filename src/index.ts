// Require the necessary discord.js classes
const fs = require("node:fs");
const path = require("node:path");

const { token } = require('./config.json')

const { Client, GatewayIntentBits, Collection } = require("discord.js");
<<<<<<< HEAD:src/index.ts
const dotenv = require("dotenv")
dotenv.config()
=======
// const dotenv = require("dotenv");
// dotenv.config();
>>>>>>> main:index.js

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: string) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  //Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.)`
    );
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file: string) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}

client.on("messageCreate", (message: { member: { user: { username: any; }; }; content: any; }) => {
  console.log(`${message.member.user.username}: ${message.content}`);
});

// Log in to Discord with your client's token
client.login(process.env["token"]);