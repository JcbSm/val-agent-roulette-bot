/**
 * Represents a Valorant Map
 */
export class ValMap {

    private _name: String;

    /**
     * Creates a new instance of a ValMap
     * @param name The name of the map.
     */
    constructor(name: String) {
        this._name = name.toLowerCase();
    }

    /**
     * Gets the ValMap name
     */
    public get name(): String {
        return this._name;
    }

}