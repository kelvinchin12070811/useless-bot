/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { REST, Routes, Client, GatewayIntentBits, CommandInteraction } from 'discord.js';
import 'dotenv/config';

import { logger } from './logger';
import { commands } from './constants/commands';

const TOKEN = process.env.TOKEN;
const APPLICATION_ID = process.env.APPLICATION_ID;

if (!TOKEN) {
    logger.error('No token provided');
    process.exit(1);
}

if (!APPLICATION_ID) {
    logger.error('No application ID provided');
    process.exit(1);
}

const main = async () => {
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    try {
        logger.info('Started refreshing application commands (slash commands).');
        await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: commands });

        logger.info('Successfully reloaded application commands.');

        client.on('ready', () => {
            logger.info(`Logged in as ${client.user?.tag}`);
        });

        client.on('interactionCreate', async rawInteraction => {
            const interaction = rawInteraction as CommandInteraction;
            if (!interaction.isCommand) return;

            logger.info('Received interaction:', interaction.commandName);

            if ((interaction as CommandInteraction).commandName === 'ping') {
                logger.info('Responding to ping command.');
                await interaction.reply('Pong!');
            }
        });

        client.login(TOKEN);
    } catch (error) {
        logger.error('Failed to reload application commands.', error);
    }
};

main();
