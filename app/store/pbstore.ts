/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import PocketBase, { AdminAuthResponse } from 'pocketbase';

import { API_PASSWORD, API_URL, API_USERNAME } from '../constants/appVariables';
import { logger } from '../logger';
const pb = new PocketBase(API_URL);

let userData: AdminAuthResponse | null = null;

const login = async () => {
    if (userData != null) {
        logger.info('Database already connected.');
        return;
    }

    logger.info('Connecting to database...');
    userData = await pb.admins.authWithPassword(API_USERNAME, API_PASSWORD);
    logger.info('Database connected.');
};

const logout = () => {
    if (userData == null) {
        logger.info('Database already disconnected.');
        return;
    }

    logger.info('Disconnecting from database...');
    userData = null;
};

export { pb, login, logout };
