import { Message, User } from "discord.js"

export type Team = 0 | 1;

/**
 * Represents a Player.
 */
export class Player {

    private _user: User;
    private _message: Message<false> | null = null;
    private _team: Team;

    /**
     * Creates a new Player instance
     * @param user The Discord user
     */
    constructor(user: User, team: Team) {
        this._user = user;
        this._team = team;
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

    public setMessage(message: Message<false>) {
        this._message = message;
    }

    public setTeam(team: Team) {
        this._team = team;
    }

}