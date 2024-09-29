/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/

import { logger } from '../logger';

/**
 * Only execute the given closure if current enveronment is not production.
 * @param closure The closure to execute.
 */
export function execIfNotProd(closure: () => void) {
    if (process.env.NODE_ENV === 'production') return;

    closure();
}

/**
 * Log a debug message to the logger if the current environment is not production.
 * @param message The message to log.
 */
export function debugLog(message: string, ...args: any[]) {
    execIfNotProd(() => logger.debug(message, args));
}
