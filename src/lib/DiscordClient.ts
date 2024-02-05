import { Client, Events, Message, User } from "discord.js";
import { Logger, createLogger, format } from "winston";
import { Console } from "winston/lib/winston/transports";
import { Player } from "./games/Player";
import { GameManager } from "./games/GameManager";
import { CommandHandler } from "./commands/CommandHandler";
import { LoggerFactory } from "./LoggerFactory";

/**
 * The Discord bot client
 */
export class DiscordClient extends Client {

    private _logger: Logger;
    private _games: GameManager;
    private _commands: CommandHandler;

    /**
     * Creates a new instnace of the client
     */
    constructor() {

        // Client Options
        super({
            intents: [
                "Guilds",           // Access to guilds
                "GuildMembers",     // Access to guild members
                "DirectMessages"    // Access to DMs
            ]
        })

        this._logger = LoggerFactory.create(DiscordClient.name);

        // Create game manager
        this._games = new GameManager(this);
        
        // Create command handler
        this._commands = new CommandHandler(this);
    }

    /**
     * Get the logger
     */
    public get logger(): Logger {
        return this._logger;
    }

    /**
     * The game manager
     */
    public get games(): GameManager {
        return this._games;
    }

    /**
     * The command handler
     */
    public get commands(): CommandHandler {
        return this._commands;
    }

    /**
     * Sends the selection message to the user's DM
     * @param user The user to send to.
     * @returns The message that has been sent.
     */
    public async sendDM(user: User): Promise<Message<false>> {
        return user.send("Starting...");
    }

    public async getChoice(player: Player) {
        
    }

}