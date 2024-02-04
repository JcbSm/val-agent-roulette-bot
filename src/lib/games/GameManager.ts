import { DiscordClient } from "../DiscordClient";
import { Game } from "./Game";

export class GameManager {

    private _games: Set<Game> = new Set();
    private _client: DiscordClient;

    constructor(client: DiscordClient) {
        this._client = client;
    }

    public get client() {
        return this._client;
    }

    public create(): Game {

        // Create the game
        const game = new Game(this.client);

        // Add to the set
        this._games.add(game);

        return game;

    }

}