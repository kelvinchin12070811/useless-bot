/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { REST, Routes } from 'discord.js';

import { logger } from './logger';
import { TOKEN, APPLICATION_ID } from './constants/appVariables';
import { commands } from './constants/commands';

const rest = new REST({ version: '10' }).setToken(TOKEN);

export async function registerCommands() {
    logger.info('Started refreshing application commands (slash commands).');
    await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: commands });

    logger.info('Successfully reloaded application commands.');
}
