import { Snowflake } from "discord.js";

/**
 * The 4 types of agents.
 */
export enum AgentType {
    DUELIST,
    INITIATOR,
    CONTROLLER,
    SENTINEL
}

export class Agent {
    
    private _name: string;
    private _emojiID: Snowflake;
    private _starter: boolean;
    private _type: AgentType;

    constructor(name: string, emojiID: Snowflake, type: AgentType, starter: boolean) {

        this._name = name;
        this._emojiID = emojiID;
        this._type = type;
        this._starter = starter;
    
    }

    public get name() {
        return this._name;
    }

    public get emojiID() {
        return this._emojiID;
    }

    public get starter() {
        return this._starter;
    }

    public get type(): AgentType {
        return this._type;
    }

}

export class Duelist extends Agent {

    constructor(name: string, emojiID: Snowflake, starter = false) {
        super(name, emojiID, AgentType.DUELIST, starter);
    }
}

export class Initiator extends Agent {
    constructor(name: string, emojiID: Snowflake, starter = false) {
        super(name, emojiID, AgentType.INITIATOR, starter);
    }
}

export class Controller extends Agent {
    constructor(name: string, emojiID: Snowflake, starter = false) {
        super(name, emojiID, AgentType.CONTROLLER, starter);
    }
}

export class Sentinel extends Agent {
    constructor(name: string, emojiID: Snowflake, starter = false) {
        super(name, emojiID, AgentType.SENTINEL, starter);
    }
}

export const agents = [
    new Duelist('Jett', '', true),
    new Duelist('Phoenix', '', true),
    new Duelist('Reyna', ''),
    new Duelist('Yoru', ''),
    new Duelist('Neon', ''),
    new Duelist('Iso', ''),

    new Initiator('Sova', '', true),
    new Initiator('Breach', ''),
    new Initiator('Skye', ''),
    new Initiator('KAY/O', ''),
    new Initiator('Fade', ''),
    new Initiator('Gecko', ''),
    
    new Controller('Brimstone', '', true),
    new Controller('Omen', ''),
    new Controller('Viper', ''),
    new Controller('Harbor', ''),
    new Controller('Astra', ''),

    new Sentinel('Sage', '', true),
    new Sentinel('Cypher', ''),
    new Sentinel('Killjoy', ''),
    new Sentinel('Deadlock', ''),
    new Sentinel('Chamber', '')
]