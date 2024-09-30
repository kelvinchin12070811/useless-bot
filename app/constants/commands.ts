/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { CommandReducer, MessageContextMenuCommandReducer } from '../commands/command';
import { ping } from '../commands/ping';
import { sticker } from '../commands/sticker';
import { about } from '../commands/about';
import { random } from '../commands/random';
import { replyWithSticker } from '../commands/sticker/replyWithSticker';
import { letMeGoogleItForYou } from '../commands/letMeGoogleItForYou';

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
            {
                name: 'choice',
                description: 'Choose from a list of choices',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'choices',
                        description:
                            'The choices to choose from, separated by comma or sepcified with the seperator option',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'saperator',
                        description: 'The saperator to use to split the choices',
                        type: ApplicationCommandOptionType.String,
                    },
                ],
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
                options: [
                    {
                        name: 'keyword',
                        description: 'The keyword to search for',
                        type: ApplicationCommandOptionType.String,
                        autocomplete: true,
                    },
                ],
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
                        autocomplete: true,
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
                        autocomplete: true,
                    },
                ],
            },
        ],
    },
    {
        name: 'Reply with sticker',
        type: ApplicationCommandType.Message,
    },
    {
        name: 'let-me-google-it-for-you',
        description: "Help people that don't know how to use Google to search for stuffs.",
        options: [
            {
                name: 'query',
                description: 'The query to search for',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'provider',
                description: 'The search engine to use, default to Google',
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'Google', value: 'google' },
                    { name: 'DuckDuckGo', value: 'duckduckgo' },
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
    'let-me-google-it-for-you': letMeGoogleItForYou,
};

export const messageContextMenuCommandJumpTable: Record<string, MessageContextMenuCommandReducer> =
    {
        'Reply with sticker': replyWithSticker,
    };
