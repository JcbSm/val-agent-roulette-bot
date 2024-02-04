import path from "path";
import { DiscordClient } from "../DiscordClient";
import { readdirSync } from "fs";
import { Logger } from "winston";
import { LoggerFactory } from "../LoggerFactory";
import { Command } from "./Command";

export class CommandHandler {

    private _client: DiscordClient;
    private _commands: Map<string, Command>;

    private logger: Logger;
    private dir = path.join(__dirname, "..", "..", "commands");

    constructor(client: DiscordClient) {
        this._client = client;
        this.logger = LoggerFactory.create(CommandHandler.name);
        this._commands = new Map();
    }

    public get client(): DiscordClient {
        return this._client;
    }

    public async load(): Promise<void> {

        this.logger.debug(`Command directory: ${this.dir}`);

        // Get directory
        const dir = readdirSync(this.dir).filter(s => s.endsWith(".js"));

        for (const file of dir) {

            this.logger.debug(`Command file found: ${file}`);

            // Get the file contents
            const fp = path.join(this.dir, file);
            const exports = require(fp);

            // Initialise new instance of class
            const command = new exports.default(this.client);

            // Add to commands
            this._commands.set(command.name, command);

        }

        this.logger.verbose("Located all command files.");
        
        return this.registerCommands();

    }

    public async registerCommands(): Promise<void> {

        this.logger.verbose("Registering commands...");

        if (this.client.application) {

            // Guild counter
            let i = 0;

            // Iterate through guilds
            for (const [guild_id, guild] of (await this.client.guilds.fetch())) {

                // Register commands for this guild
                await this.client.application.commands.set([...this._commands.values()], guild_id);

                this.logger.verbose(`Registered commands for guild ${guild_id} ${guild.name}`);

                // Increment counter
                i++;

            }

            this.logger.info(`Registered application commands for ${i} guilds.`);

        } else throw new Error("Client application not found. Unable to register commands.");

    }
}