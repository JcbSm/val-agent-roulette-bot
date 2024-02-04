import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { Command } from "./Command";

/**
 * Chat input commands
 */
export abstract class ChatInputCommand extends Command {

    /**
     * Checks if the interaction was from this command, and runs `chatInputRun()`
     * @param interaction The interaction created.
     * @see chatInputRun
     */
    public run(interaction: Interaction) {
        if (interaction.isChatInputCommand() && interaction.commandName == this.name) {
            this.chatInputRun(interaction);
        }
    } 

    /**
     * The code to be executed when the command is called
     * @param interaction The interaction that was created
     */
    public abstract chatInputRun(interaction: ChatInputCommandInteraction): any;
}