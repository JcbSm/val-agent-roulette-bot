import { Client, Message, User } from "discord.js";
import { Logger, createLogger, format } from "winston";
import { Console } from "winston/lib/winston/transports";
import { Player } from "./Player";

/**
 * The Discord bot client
 */
export class DiscordClient extends Client {

    private _logger: Logger;

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

        this._logger = createLogger({
            // Set level
            level: process.env.LOG_LEVEL || 'info',
            // CLI output
            format: format.cli(),
            transports: [new Console()]
        });
    }

    /**
     * Get the logger
     */
    public get logger(): Logger {
        return this._logger;
    }

    /**
     * Loads the application commands
     */
    public async loadApplicationCommands(): Promise<void> {



    }

    /**
     * Sends the selection message to the user's DM
     * @param user The user to send to.
     * @returns The message that has been sent.
     */
    public async sendDM(user: User): Promise<Message> {
        return user.send("NOT YET IMPLEMENTED");
    }

    public async getChoice(player: Player) {
        
    }

}