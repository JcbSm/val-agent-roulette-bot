import { Interaction } from "discord.js";
import { DiscordClient } from "../DiscordClient";

/**
 * Base level command
 */
export abstract class Command {

    private _client: DiscordClient;
    private _name: string;
    private _desc: string;

    /**
     * 
     * @param name The name of the command (must be lower case)
     * @param description The description
     */
    constructor(client: DiscordClient, name: string, description: string) {
        this._client = client;
        this._name = name;
        this._desc = description;
    }

    public get client() {
        return this._client;
    }

    /**
     * The name of the command
     */
    public get name() {
        return this._name;
    }

    /**
     * The command's description
     */
    public get description() {
        return this._desc;
    }

    /**
     * The code to be run when the command is called
     * @param interaction The interaction created when running the command
     */
    public abstract run(interaction: Interaction): any;
}