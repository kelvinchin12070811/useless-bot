/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { logger } from '../logger';

const TOKEN: string = process.env.TOKEN ?? '';
const APPLICATION_ID: string = process.env.APPLICATION_ID ?? '';

if (TOKEN === '') {
    logger.error('No token provided');
    process.exit(1);
}

if (APPLICATION_ID === '') {
    logger.error('No application ID provided');
    process.exit(1);
}

export { TOKEN, APPLICATION_ID };
