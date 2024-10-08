/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import {
    ChatInputCommandInteraction,
    Client,
    GatewayIntentBits,
    MessageContextMenuCommandInteraction,
} from 'discord.js';

import { logger } from './logger';
import { TOKEN } from './constants/appVariables';
import { invokeCommand, invokeMessageContextMenuCommand } from './commands/command';
import { debugLog, execIfNotProd } from './utils/functional';
import { login, logout } from './store/pbstore';

let client: Client | null = null;

export async function initializeClient() {
    await login();

    client = new Client({ intents: [GatewayIntentBits.Guilds] });

    if (client == null) {
        throw new Error('Failed to initialize client.');
    }

    client.on('ready', () => {
        logger.info(`Logged in as ${client?.user?.tag}`);
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand) return;

        if (interaction.isMessageContextMenuCommand()) {
            debugLog('Running Message Context Menu Command');
            const commandInteraction = interaction as MessageContextMenuCommandInteraction;
            await invokeMessageContextMenuCommand(
                commandInteraction.commandName,
                commandInteraction
            );
            return;
        }

        const commandInteraction = interaction as ChatInputCommandInteraction;

        execIfNotProd(() => logger.debug('Received interaction:', commandInteraction.commandName));

        await invokeCommand(commandInteraction.commandName, commandInteraction);
    });

    client.login(TOKEN);
}

export function destroyClient() {
    if (client == null) {
        logger.info('Client did not exist yet.');
        return;
    }

    logger.info('Destroying client.');
    client.destroy();
    logger.info('Client destroyed.');

    logout();
}
