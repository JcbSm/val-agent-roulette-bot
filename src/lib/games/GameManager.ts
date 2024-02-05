import { User } from "discord.js";
import { DiscordClient } from "../DiscordClient";
import { Game } from "./Game";
import { Logger } from "winston";
import { LoggerFactory } from "../LoggerFactory";

export class GameManager {

    private _games: Set<Game> = new Set();
    private _client: DiscordClient;

    private logger: Logger

    constructor(client: DiscordClient) {
        this._client = client;

        this.logger = LoggerFactory.create(GameManager.name);
    }

    public get client() {
        return this._client;
    }

    public create(host: User): Game {

        this.logger.info(`Game created. Host: ${host.username}`);

        // Create the game
        const game = new Game(this.client, host);

        // Add to the set
        this._games.add(game);

        return game;

    }

}