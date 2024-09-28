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
const GUILD_ID: string = process.env.GUILD_ID ?? '';

function checkEnvVar(envVar: string, envVarName: string) {
    if (envVar !== '') return;
    logger.error(
        `No ${envVarName} provided. Make sure the environment variable ${envVarName} is set.`
    );
    process.exit(1);
}

checkEnvVar(TOKEN, 'TOKEN');
checkEnvVar(APPLICATION_ID, 'APPLICATION_ID');
checkEnvVar(API_USERNAME, 'API_USERNAME');
checkEnvVar(API_PASSWORD, 'API_PASSWORD');
checkEnvVar(API_URL, 'API_URL');
checkEnvVar(GUILD_ID, 'GUILD_ID');

export { TOKEN, APPLICATION_ID, API_USERNAME, API_PASSWORD, API_URL, GUILD_ID };
