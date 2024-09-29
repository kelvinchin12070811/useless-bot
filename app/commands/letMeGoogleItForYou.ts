/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
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
