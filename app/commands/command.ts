/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/

import { ChatInputCommandInteraction } from 'discord.js';
import { commandJumpTable } from '../constants/commands';
import { logger } from '../logger';

export type CommandReducer = (interaction: ChatInputCommandInteraction) => Promise<void>;

export async function invokeCommand(command: string, interaction: ChatInputCommandInteraction) {
    logger.debug(`Invoking command ${command}.`);
    if (!(command in commandJumpTable)) {
        logger.warn(`Command ${command} not found in the registry.`);
        return;
    }

    await commandJumpTable[command](interaction);
}
