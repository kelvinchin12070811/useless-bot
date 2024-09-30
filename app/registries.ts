/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { REST, Routes } from 'discord.js';

import { logger } from './logger';
import { TOKEN, APPLICATION_ID, GUILD_ID } from './constants/appVariables';
import { commands } from './constants/commands';

const rest = new REST({ version: '10' }).setToken(TOKEN);

export async function registerCommands() {
    logger.info('Started refreshing application commands (slash commands).');

    if (process.env.NODE_ENV !== 'production') {
        logger.info('In development mode, only updating guild commands.');
        await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: [] });
        await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), {
            body: commands,
        });
    } else {
        logger.info('In production mode, updating global commands.');
        await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: commands });
        await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), {
            body: [],
        });
    }

    logger.info('Successfully reloaded application commands.');
}
