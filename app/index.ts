/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import 'dotenv/config';

import { logger } from './logger';
import { registerCommands } from './registries';
import { destroyClient, initializeClient } from './client';

const main = async () => {
    try {
        await registerCommands();
        initializeClient();
    } catch (error) {
        logger.error('Failed to reload application commands.', error);
    }
};

// Process gracefully exits on ctrl-c
process.on('SIGINT', () => {
    logger.info('Shutting down.');
    destroyClient();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Shutting down.');
    destroyClient();
    process.exit(0);
});

main();
