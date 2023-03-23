const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      // const message = await interaction.fetchReply();
      // console.log(message);
      const sent = await interaction.reply({
        content: "Pinging...",
        fetchReply: true,
      });
      await interaction.editReply(
        `Roundtrip latency: ${
          sent.createdTimestamp - interaction.createdTimestamp
        }ms`
      );
    }

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
