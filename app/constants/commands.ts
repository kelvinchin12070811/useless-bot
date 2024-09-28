/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { ApplicationCommandOptionType } from 'discord.js';
import { CommandReducer } from '../commands/command';
import { ping } from '../commands/ping';
import { sticker } from '../commands/sticker';

export const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'sticker',
        description: 'Replies with a sticker!',
        options: [
            {
                name: 'simple-list',
                description: 'A quick and dirty list of avaliable stickers to choose from',
                type: ApplicationCommandOptionType.Subcommand,
            },
        ],
    },
];

export const commandJumpTable: Record<string, CommandReducer> = {
    ping,
    sticker,
};
