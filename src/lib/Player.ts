import { User } from "discord.js"

/**
 * Represents a Player.
 */
export class Player {

    private _user: User;

    /**
     * Creates a new Player instance
     * @param user The Discord user
     */
    constructor(user: User) {
        this._user = user;
    }

    /**
     * Gets the discord user
     */
    public get user(): User {
        return this._user;
    }

}