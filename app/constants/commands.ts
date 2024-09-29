/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { ApplicationCommandOptionType } from 'discord.js';
import { CommandReducer } from '../commands/command';
import { ping } from '../commands/ping';
import { sticker } from '../commands/sticker';
import { about } from '../commands/about';
import { random } from '../commands/random';

export const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'about',
        description: 'About this bot',
    },
    {
        name: 'random',
        description: 'A sereis of functions that deals with random probability stuffs',
        options: [
            {
                name: 'dice',
                description: 'Roll a dice',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'coin',
                description: 'Flip a coin',
                type: ApplicationCommandOptionType.Subcommand,
            },
        ],
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
            {
                name: 'preview',
                description: 'Preview a sticker',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'sticker',
                        description: 'The sticker to preview, only you can see the message.',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: 'send',
                description: 'Send a sticker',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'sticker',
                        description: 'The sticker to send',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
        ],
    },
];

export const commandJumpTable: Record<string, CommandReducer> = {
    ping,
    sticker,
    about,
    random,
};
