/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/

import { ChatInputCommandInteraction, MessageContextMenuCommandInteraction } from 'discord.js';
import { commandJumpTable, messageContextMenuCommandJumpTable } from '../constants/commands';
import { logger } from '../logger';

export type CommandReducer = (interaction: ChatInputCommandInteraction) => Promise<void>;
export type MessageContextMenuCommandReducer = (
    interaction: MessageContextMenuCommandInteraction
) => Promise<void>;

export async function invokeCommand(command: string, interaction: ChatInputCommandInteraction) {
    logger.debug(`Invoking command ${command}.`);
    if (!(command in commandJumpTable)) {
        logger.warn(`Command ${command} not found in the registry.`);
        return;
    }

    await commandJumpTable[command](interaction);
}

export async function invokeMessageContextMenuCommand(
    command: string,
    interaction: MessageContextMenuCommandInteraction
) {
    logger.debug(`Invoking message context menu command ${command}.`);
    if (!(command in messageContextMenuCommandJumpTable)) {
        logger.warn(`Command ${command} not found in the registry.`);
        return;
    }

    await messageContextMenuCommandJumpTable[command](interaction);
}
