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
    new Duelist('Jett', '930526575366111243', true),
    new Duelist('Phoenix', '930526575408070766', true),
    new Duelist('Raze', '930526575789760512'),
    new Duelist('Reyna', '930526575395483739'),
    new Duelist('Yoru', '930526575953346560'),
    new Duelist('Neon', '936618293417115698'),
    new Duelist('Iso', '1204070638432817184'),

    new Initiator('Sova', '930526575319982133', true),
    new Initiator('Breach', '930526575978500096'),
    new Initiator('Skye', '930526575793930280'),
    new Initiator('KAY/O', '930526575596810301'),
    new Initiator('Fade', '1113104096593977446'),
    new Initiator('Gecko', '1113104098770833520'),
    
    new Controller('Brimstone', '930526575299027034', true),
    new Controller('Omen', '930526575311605781'),
    new Controller('Viper', '930526575626178771'),
    new Controller('Harbor', '1113104105804669021'),
    new Controller('Astra', '930526576028827748'),

    new Sentinel('Sage', '930526575366140044', true),
    new Sentinel('Cypher', '930526575248687165'),
    new Sentinel('Killjoy', '930526575982706798'),
    new Sentinel('Deadlock', '1204070658896822292'),
    new Sentinel('Chamber', '930526575332573235')
]