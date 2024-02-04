import { Collection, Snowflake } from "discord.js";
import { DiscordClient } from "../DiscordClient";
import { Player } from "./Player";

/**
 * Handles the main logic of the game.
 */
export class Game {

    private _client: DiscordClient;
    private _players: Collection<Snowflake, Player> = new Collection();

    /**
     * Creates a new instance of a Game
     * @param client The Discord client that initilaised the game
     */
    constructor(client: DiscordClient) {
        this._client = client;
    }

    /**
     * The Discord Client
     */
    public get client() {
        return this._client;
    }

    /**
     * The players currently in the Game
     */
    public get players() {
        return this._players;
    }

    /**
     * Adds a player to the game
     * @param player The player to add
     */
    public addPlayer(player: Player) {
        this._players.set(player.user.id, player);
    }

    /**
     * Removes a player from the game
     * @param player The player to remove
     */
    public removePlayer(player: Player) {
        this._players.delete(player.user.id);
    }

    public async start() {
        
    }
}