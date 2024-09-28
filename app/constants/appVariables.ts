/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { logger } from '../logger';

const TOKEN: string = process.env.TOKEN ?? '';
const APPLICATION_ID: string = process.env.APPLICATION_ID ?? '';
const API_USERNAME: string = process.env.API_USERNAME ?? '';
const API_PASSWORD: string = process.env.API_PASSWORD ?? '';
const API_URL: string = process.env.API_URL ?? '';

if (TOKEN === '') {
    logger.error('No token provided. Make sure the environment variable TOKEN is set.');
    process.exit(1);
}

if (APPLICATION_ID === '') {
    logger.error(
        'No application ID provided. Make sure the environment variable APPLICATION_ID is set.'
    );
    process.exit(1);
}

if (API_USERNAME === '') {
    logger.error(
        'No api username is provided. Make sure the environment variable API_USERNAME is set.'
    );
    process.exit(1);
}

if (API_PASSWORD === '') {
    logger.error(
        'No api password is provided. Make sure the environment variable API_PASSWORD is set.'
    );
    process.exit(1);
}

if (API_URL === '') {
    logger.error('No api url is provided. Make sure the environment variable API_URL is set.');
    process.exit(1);
}

export { TOKEN, APPLICATION_ID, API_USERNAME, API_PASSWORD, API_URL };
