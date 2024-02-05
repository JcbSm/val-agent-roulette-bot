import { ButtonInteraction, ChatInputCommandInteraction } from "discord.js";
import { ChatInputCommand } from "../lib/commands/ChatInputCommand";
import { DiscordClient } from "../lib/DiscordClient";
import { Player } from "../lib/games/Player";

export default class extends ChatInputCommand {
    constructor(client: DiscordClient) {
        super(client, 'start', 'Start a new game of Agent Roulette');
    }

    public async chatInputRun(interaction: ChatInputCommandInteraction) {

        // Create the game
        const game = this.client.games.create(interaction.user);

        // Send the "Lobby" message
        await game.sendLobbyMessage(interaction);

        if (!game.lobbyMessage) return; // idk why this would happen

        const lobbyCollector = game.lobbyMessage.createMessageComponentCollector({ filter: (i) => i.isButton() });

        lobbyCollector.on("collect", (i: ButtonInteraction) => {

            switch (i.customId) {

                case "joinTeam1":
                    game.addPlayer(new Player(i.user, 0))
                    break;
                case "joinTeam2":
                    game.addPlayer(new Player(i.user, 1))
                    break;
                case "options":
                    break;
                case "leave":
                    game.removePlayer(i.user);
                    break;

            }

            // Update changes
            game.updateLobbyMessage(i);

        })

    }
}