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
    
    private _type: AgentType;

    constructor(type: AgentType) {
        this._type = type;
    }

    public get type(): AgentType {
        return this._type;
    }

}

export class Duelist extends Agent {
    constructor() {
        super(AgentType.DUELIST);
    }
}