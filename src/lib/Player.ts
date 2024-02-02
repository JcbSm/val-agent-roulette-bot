import { Message, User } from "discord.js"

/**
 * Represents a Player.
 */
export class Player {

    private _user: User;
    private _message: Message<false> | null = null;

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

    public get message(): Message<false> | null {
        return this._message;
    }

    public setMessage(message: Message<false>) {
        this._message = message;
    }

}