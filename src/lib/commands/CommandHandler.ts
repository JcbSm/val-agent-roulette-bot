import path from "path";
import { DiscordClient } from "../DiscordClient";
import { readdirSync } from "fs";
import { Logger } from "winston";
import { LoggerFactory } from "../LoggerFactory";
import { Command } from "./Command";
import { Events, Guild } from "discord.js";

export class CommandHandler {

    private _client: DiscordClient;
    private _commands: Map<string, Command>;

    private logger: Logger;
    private dir = path.join(__dirname, "..", "..", "commands");

    /**
     * Creates a new CommandHandler
     * @param client The DiscordClient
     */
    constructor(client: DiscordClient) {
        this._client = client;
        this.logger = LoggerFactory.create(CommandHandler.name);
        this._commands = new Map();
    }

    /**
     * The DiscordClient
     */
    public get client(): DiscordClient {
        return this._client;
    }

    /**
     * The application command cache
     */
    public get cache(): Map<string, Command> {
        return this._commands;
    }

    /**
     * Loads the commands from file into the cache
     */
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
        
        // Register the commands to Discord
        return this.registerCommands();

    }

    /**
     * Registers the commands to each guild
     */
    public async registerCommands(): Promise<void> {

        this.logger.verbose("Registering commands...");

        // Guild counter
        let i = 0;

        // Iterate through guilds
        for (const [_, guild] of (await this.client.guilds.fetch())) {

            // Register guild command
            await this.registerGuildCommands(await guild.fetch());

            // Increment counter
            i++;

        }

        this.logger.info(`Registered application commands for ${i} guilds.`);

        // Register listeners
        this.registerListeners();

    }

    public async registerGuildCommands(guild: Guild) {

        // Assert application exists
        if (this.client.application == null) throw new Error(`Client application not found. Unable to register commands for guild ${guild.id}`)

        // Register commands for this guild
        await this.client.application.commands.set([...this._commands.values()], guild.id);

        this.logger.verbose(`Registered commands for guild ${guild.id} ${guild.name}`);

    }

        /**
     * Registers event listeners for each command
     */
        public registerListeners() {

            this.logger.verbose("Registering command listeners...");
    
            // Iterate through commands
            for (const [name, command] of this.cache) {
    
                this.logger.verbose(`Registering listener for \`${name}\` command`);
    
                // Add event listener for each command
                this.client.on(Events.InteractionCreate, (i) => command.run(i));
    
            }
    
            this.logger.info("Registered command listeners.");
    
        }
}