/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/

import { CommandDescriptor } from '../constants/commands';
import { CommandReducer } from './command';

export const ping: CommandReducer = async interaction => {
    await interaction.reply('Pong!');
};

export const pingCommandDescription: CommandDescriptor = {
    name: 'ping',
    description: 'Replies with Pong!',
};
