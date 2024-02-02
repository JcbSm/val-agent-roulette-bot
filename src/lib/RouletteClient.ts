import { Client } from "discord.js";
import { Logger, createLogger, format } from "winston";
import { Console } from "winston/lib/winston/transports";

/**
 * The Discord bot client
 */
export class RouletteClient extends Client {

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
    public get logger() {
        return this._logger;
    }

}