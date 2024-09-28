import { CommandReducer } from '../commands/command';
import { ping } from '../commands/ping';

/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
export const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

export const commandJumpTable: Record<string, CommandReducer> = {
    ping,
};
