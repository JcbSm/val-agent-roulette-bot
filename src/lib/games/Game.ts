import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, Collection, EmbedBuilder, Interaction, Message, Snowflake, User } from "discord.js";
import { DiscordClient } from "../DiscordClient";
import { Player } from "./Player";

/**
 * Handles the main logic of the game.
 */
export class Game {

    private _client: DiscordClient;
    private _players: Collection<Snowflake, Player> = new Collection();
    private _host: User;
    private _lobbyMessage: Message | undefined; 

    /**
     * Creates a new instance of a Game
     * @param client The Discord client that initilaised the game
     */
    constructor(client: DiscordClient, host: User) {
        this._client = client;
        this._host = host;
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
        this._players.set(player.user.id, player);
    }

    /**
     * Removes a player from the game
     * @param player The player to remove
     */
    public removePlayer(user: User) {
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
                        .setStyle(ButtonStyle.Secondary)
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

    public async updateLobbyMessage(interaction: ButtonInteraction) {
        interaction.update({
            embeds: [ this.lobbyEmbed ],
            components: this.lobbyComponents
        })
    }
}