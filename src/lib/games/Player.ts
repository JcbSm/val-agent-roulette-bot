import { Message, User } from "discord.js"
import { Agent } from "../valorant/Agents";

export type Team = 0 | 1;

/**
 * Represents a Player.
 */
export class Player {

    private _user: User;
    private _message: Message<false> | null = null;
    private _team: Team;

    private _agents: Set<Agent>;

    /**
     * Creates a new Player instance
     * @param user The Discord user
     */
    constructor(user: User, team: Team) {
        this._user = user;
        this._team = team;

        this._agents = new Set();
    }

    /**
     * Gets the discord user
     */
    public get user(): User {
        return this._user;
    }

    public get message(): Message<false> | null {
        return this._message;
    }

    public get team() {
        return this._team;
    }

    public get agents() {
        return this._agents;
    }

    public setMessage(message: Message<false>) {
        this._message = message;
    }

    public setTeam(team: Team) {
        this._team = team;
    }

    public hasAgent(agent: Agent) {
        return this._agents.has(agent);
    }

    public addAgent(agent: Agent) {
        this._agents.add(agent);
    }

    public removeAgent(agent: Agent) {
        this._agents.delete(agent);
    }

}