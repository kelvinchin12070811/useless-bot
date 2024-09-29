/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandReducer } from '../command';

const coinEmojiMapping: Record<number, string> = {
    0: 'https://cdn3.emoji.gg/emojis/7245-coinflipheads.png',
    1: 'https://cdn3.emoji.gg/emojis/24620-coinfliptails.png',
};

export const coin: CommandReducer = async interaction => {
    const flip = Math.floor(Math.random() * 2);
    await interaction.reply({
        embeds: [
            {
                title: flip === 0 ? 'Heads' : 'Tails',
                thumbnail: {
                    url: coinEmojiMapping[flip],
                },
                footer: {
                    text: 'Icon made by emoji.gg',
                    icon_url: 'https://emoji.gg/assets/img/logo.png?v=2',
                },
            },
        ],
    });
};
