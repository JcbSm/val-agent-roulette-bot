import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { Agent } from "./valorant/Agents";
import { Player } from "./games/Player";
import { ButtonStyle } from "discord.js";

export class MessageComponentUtil {

    public static getAgentButtons(player: Player, agents: Agent[]): ActionRowBuilder<ButtonBuilder>[] {

        return [...this.chunks(agents, 5)].map(chunk => {
            return new ActionRowBuilder<ButtonBuilder>()
                .setComponents(chunk.map(agent => {
                    return new ButtonBuilder()
                        .setCustomId(`select_${agent.nameLowerCase}`)
                        .setLabel(agent.name)
                        .setEmoji({ id: agent.emojiID })
                        .setStyle(player.agents.has(agent) ? ButtonStyle.Success : ButtonStyle.Secondary)
                }))
        })

    }

    private static *chunks<T>(array: T[], size: number): Generator<T[], void> {
        for (let i = 0; i < array.length; i += size) {
            yield array.slice(i, i + size);
        }
    }

}