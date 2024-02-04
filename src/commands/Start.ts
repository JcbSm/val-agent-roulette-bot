import { ChatInputCommandInteraction } from "discord.js";
import { ChatInputCommand } from "../lib/commands/ChatInputCommand";
import { DiscordClient } from "../lib/DiscordClient";

export default class extends ChatInputCommand {
    constructor(client: DiscordClient) {
        super(client, 'start', 'Start a new game of Agent Roulette');
    }

    public async chatInputRun(interaction: ChatInputCommandInteraction) {
        
    }
}