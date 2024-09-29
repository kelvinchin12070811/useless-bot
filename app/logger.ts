/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import log4js from 'log4js';
const { getLogger } = log4js;

const logger = getLogger('useless-bot');
logger.level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

export { logger };
