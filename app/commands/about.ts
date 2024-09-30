/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandDescriptor } from '../constants/commands';
import { CommandReducer } from './command';

export const about: CommandReducer = async interaction => {
    const me = await interaction.guild?.members.fetchMe();
    const displayName = me?.displayName ?? interaction.client.user.displayName;

    await interaction.reply({
        embeds: [
            {
                title: 'About this bot',
                description: [
                    `${displayName} is a bot based on [useless-bot](https://github.com/kelvinchin12070811/useless-bot).`,
                    'This bot have no idea what it can do nor what it will do, it is just created for exporing how a discord',
                    'bot can do or what it can achive.',
                ].join(' '),
                image: {
                    url: 'https://raw.githubusercontent.com/kelvinchin12070811/useless-bot/refs/heads/dev/banner.jpg',
                },
                url: 'https://github.com/kelvinchin12070811/useless-bot',
                color: 0x010409,
            },
        ],
        ephemeral: true,
    });
};

export const aboutCommandDescription: CommandDescriptor = {
    name: 'about',
    description: 'About this bot',
};
