import { Routes, REST, SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';
config();
const token = process.env.BOT_TOKEN;
const clientid = process.env.CLIEND_ID;
const commands = [
    new SlashCommandBuilder()
      .setName('lineups')
      .setDescription(
        'Sends a Lineup link of Valorant based on the specified Agent name and Map name'
      )
      .addStringOption((option) =>
        option
          .setName("agent")
          .setDescription('Select the Agent')
          .setRequired(true)
          .addChoices(
            { name: 'Gekko', value: 'Gekko' },
            { name: 'Fade', value: 'Fade' },
            { name: 'Breach', value: 'Breach' },
            { name: 'Deadlock', value: 'Deadlock' },
            { name: 'Raze', value: 'Raze' },
            { name: 'Chamber', value: 'Chamber' },
            { name: 'KAY/O', value: 'KAY/O' },
            { name: 'Skye', value: 'Skye' },
            { name: 'Cypher', value: 'Cypher' },
            { name: 'Sova', value: 'Sova' },
            { name: 'Sova', value: 'Sova' }, // Duplicate entry
            { name: 'Killjoy', value: 'Killjoy' },
            { name: 'Harbor', value: 'Harbor' },
            { name: 'Viper', value: 'Viper' },
            { name: 'Phoenix', value: 'Phoenix' },
            { name: 'Astra', value: 'Astra' },
            { name: 'Brimstone', value: 'Brimstone' },
            { name: 'Iso', value: 'Iso' },
            { name: 'Clove', value: 'Clove' },
            { name: 'Neon', value: 'Neon' },
            { name: 'Yoru', value: 'Yoru' },
            { name: 'Sage', value: 'Sage' },
            { name: 'Reyna', value: 'Reyna' },
            { name: 'Omen', value: 'Omen' },
            { name: 'Jett', value: 'Jett' }
          )
      )
      .addStringOption((option) =>
        option
          .setName('map')
          .setDescription('Select the Map')
          .setRequired(true)
          .addChoices(
            { name: 'Ascent', value: 'Ascent' },
            { name: 'Split', value: 'Split' },
            { name: 'Fracture', value: 'Fracture' },
            { name: 'Bind', value: 'Bind' },
            { name: 'Breeze', value: 'Breeze' },
            { name: 'District', value: 'District' },
            { name: 'Kasbah', value: 'Kasbah' },
            { name: 'Drift', value: 'Drift' },
            { name: 'Piazza', value: 'Piazza' },
            { name: 'Abyss', value: 'Abyss' },
            { name: 'Lotus', value: 'Lotus' },
            { name: 'Sunset', value: 'Sunset' },
            { name: 'Basic Training', value: 'Basic Training' },
            { name: 'Pearl', value: 'Pearl' },
            { name: 'Icebox', value: 'Icebox' },
            { name: 'The Range', value: 'The Range' },
            { name: 'Haven', value: 'Haven' }
          )
      ),
  ].map((command) => command.toJSON());

console.log(commands);
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientid),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
