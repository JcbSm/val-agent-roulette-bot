import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, Collection, EmbedBuilder, Interaction, Message, Snowflake, User } from "discord.js";
import { DiscordClient } from "../DiscordClient";
import { Player } from "./Player";
import { Logger } from "winston";
import { LoggerFactory } from "../LoggerFactory";

export enum GamePhase {
    LOBBY,
    STARTING,
    SELECTION,
    PICKING,
    FINISHED
}

/**
 * Handles the main logic of the game.
 */
export class Game {

    private _client: DiscordClient;
    private _players: Collection<Snowflake, Player> = new Collection();
    private _host: User;
    private _lobbyMessage: Message | undefined; 
    
    private logger: Logger;
    private phase: GamePhase;

    /**
     * Creates a new instance of a Game
     * @param client The Discord client that initilaised the game
     */
    constructor(client: DiscordClient, host: User) {
        this._client = client;
        this._host = host;

        this.logger = LoggerFactory.create(Game.name);

        this.phase = GamePhase.LOBBY;
    }

    /**
     * The Discord Client
     */
    public get client() {
        return this._client;
    }

    /**
     * The host of the game.
     */
    public get host() {
        return this._host;
    }

    /**
     * The players currently in the Game
     */
    public get players() {
        return this._players;
    }

    /**
     * Adds a player to the game
     * @param player The player to add
     */
    public addPlayer(player: Player) {

        this.logger.verbose(`Adding player ${player.user.username}`)

        this._players.set(player.user.id, player);
    }

    /**
     * Removes a player from the game
     * @param player The player to remove
     */
    public removePlayer(user: User) {

        this.logger.verbose(`Removing player ${user.username}`);

        this._players.delete(user.id);
    }

    /**
     * Get the game as an embed
     */
    public get lobbyEmbed(): EmbedBuilder {

        return new EmbedBuilder()
            .setTitle("Agent Roulette")
            .setDescription(`Host: ${this.host}\nPlayers: \`${this.players.size}/10\`\n\u200b`)
            .setFields([
                {
                    name: "Team 1",
                    value: this.players.filter(p => p.team == 0).map(p => `${p.user}`).join("\n") || "Click to join!",
                    inline: true
                },
                { name: "\u200b", value: "\u200b", inline: true },
                {
                    name: "Team 2",
                    value: this.players.filter(p => p.team == 1).map(p => `${p.user}`).join("\n") || "Click to join!",
                    inline: true
                }
            ])
    }

    /**
     * Get the message components
     */
    public get lobbyComponents(): ActionRowBuilder<ButtonBuilder>[] {

        return [
            new ActionRowBuilder<ButtonBuilder>()
                .setComponents([
                    new ButtonBuilder()
                        .setCustomId("joinTeam1")
                        .setStyle(ButtonStyle.Primary)
                        .setLabel("Join Team 1")
                        .setDisabled(this.players.filter(p => p.team == 0).size == 5),
                    
                    new ButtonBuilder()
                        .setCustomId("joinTeam2")
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Join Team 2")
                        .setDisabled(this.players.filter(p => p.team == 1).size == 5),
                ]),
            
            new ActionRowBuilder<ButtonBuilder>()
                .setComponents([
                    new ButtonBuilder()
                        .setCustomId("options")
                        .setEmoji("⚙️")
                        .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                        .setCustomId("leave")
                        .setEmoji("❌")
                        .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                        .setCustomId("start")
                        .setLabel("Start")
                        .setStyle(ButtonStyle.Success)
                ])
        ]
    }

    public get lobbyMessage() {
        return this._lobbyMessage;
    }

    public async sendLobbyMessage(interaction: ChatInputCommandInteraction) {

        // Send the lobby message
        await interaction.reply({
            embeds: [ this.lobbyEmbed ],
            components: this.lobbyComponents
        })

        // Assign it
        this._lobbyMessage = await interaction.fetchReply();
    }

    /**
     * Updates the lobby message after a ButtonInteraction is received
     * @param interaction The interaction to update from
     */
    public async updateLobbyMessage(interaction: ButtonInteraction) {
        interaction.update({
            embeds: [ this.lobbyEmbed ],
            components: this.phase == GamePhase.LOBBY ? this.lobbyComponents : []
        })
    }

    /**
     * Sends a DM message to a player
     * @param player The player to send to
     * @returns The message sent
     */
    public async sendDM(player: Player): Promise<Message<false>> {

        this.logger.verbose(`Sending DM message to ${player.user.username}`);

        if (player.message)
            throw new Error("Player message has already been sent.");

        const msg = await this.client.sendDM(player.user);

        player.setMessage(msg);

        return msg;
    }

    /**
     * Sends out the initial messages to players DMs
     */
    public async sendDMs() {

        this.logger.verbose("Sending DM messages...");

        // Send DM messages to all players
        await Promise.all(this.players.map(p => this.sendDM(p)));

        this.logger.verbose("All messages sent.");

    }

    public async selectAgents(player: Player) {

        await player.message?.edit({})

    }

    public async selectPhase() {

        this.logger.verbose("Starting selection phase...");
        this.phase = GamePhase.SELECTION;

        await Promise.all(this.players.map(p => this.selectAgents(p)));

        this.logger.verbose("All players have selected agents.");;

    }

    public async pickPhase() {

        this.logger.verbose("Starting pick phase...");
        this.phase = GamePhase.PICKING

    }

    public async displayResults() {

        this.logger.verbose("Displaying results...");
        this.phase = GamePhase.FINISHED;

    }

    /**
     * Starts the game
     */
    public async start() {

        this.logger.info("Starting...");
        this.phase = GamePhase.STARTING;

        // Send all initial DM messages
        await this.sendDMs();

        // Start selection phase, where players specify which agents they have
        await this.selectPhase();

        // Start the pick phase, where players pick another players agent to play as
        await this.pickPhase();

        // Display the results
        await this.displayResults();

        this.logger.info("Finished.");

    }

}