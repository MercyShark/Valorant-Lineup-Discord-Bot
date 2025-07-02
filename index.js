import {
  Client,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionType,
} from "discord.js";


import express from 'express';
import mongoose from "mongoose";
import { config } from "dotenv";
import Lineup from "./models/lineup.js";
config();
const token = process.env.BOT_TOKEN;
const mongo_url = process.env.MONGO_URL
mongoose.connect(`${mongo_url}valorant_db`)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
//   console.log(interaction);

	if(interaction.type == InteractionType.ApplicationCommand){

		if (interaction.commandName == "ping"){
			interaction.reply("pong")
		}
		if (interaction.commandName === "lineups") {
			// console.log(interaction)
			const agent = interaction.options.getString('agent');
			const map = interaction.options.getString('map')
			
			const nextBtn = new ButtonBuilder()
			.setCustomId(`nextLineUpButton_${agent}_${map}_1`)
			.setStyle(ButtonStyle.Success)
			.setLabel("Next LineUp ⏩")
			const row = new ActionRowBuilder().addComponents(nextBtn);
			try{ 
				const results = await Lineup.findOne({ 
					agent: agent, 
					map: map 
				});
				await interaction.reply(
					{
						content : results.lineups_videos[0],
						components: [row],

					}
					)
			}catch{
				await interaction.reply("Something went wrong!"
				)

			}
		}
	}
	else if(interaction.isButton()){
			const [btnName,agent,map,index]  = interaction.customId.split("_");
			if(btnName === "nextLineUpButton"){
				try {
					const result = await Lineup.findOne({ 
						agent: agent, 
						map: map 
					});
					let idx = parseInt(index,10) 
					if(idx > (result.lineups_videos.length - 1)){
						interaction.reply("No more Links avaiable!")
					}
					const link = result.lineups_videos[idx];
					const newIndex = idx + 1;

					const nextBtn = new ButtonBuilder()
						.setCustomId(`nextLineUpButton_${agent}_${map}_${newIndex}`)
						.setStyle(ButtonStyle.Success)
						.setLabel("Next new LineUp ⏩")
					const newrow = new ActionRowBuilder().addComponents(nextBtn);
					await interaction.update({
						content: link,
						components: [newrow]
					});

				} catch (error) {

					console.log(error)
					await interaction.reply(
						{
							content : "Something went wrong"
						}
					)
				}
			}
		}
})
client.login(token);


const app = express();

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.head('/health', (req, res) => {
    res.status(200).end(); // Respond with headers only, no body
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server (v1)is running on port  ${PORT}`);
});

