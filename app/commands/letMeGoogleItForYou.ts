/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { ApplicationCommandOptionType } from 'discord.js';
import { CommandDescriptor } from '../constants/commands';
import { CommandReducer } from './command';

const provider: Record<string, string> = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
};

export const letMeGoogleItForYou: CommandReducer = async interaction => {
    const providerName = interaction.options.getString('provider') ?? 'google';
    const query = interaction.options.getString('query') ?? '';
    await interaction.reply(provider[providerName] + encodeURIComponent(query));
};

export const letMeGoogleItForYouCommandDescription: CommandDescriptor = {
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
};
