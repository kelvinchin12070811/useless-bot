/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { pb } from '../../store/pbstore';
import { CommandReducer } from '../command';

export const preview: CommandReducer = async interaction => {
    const targetSticker = interaction.options.getString('sticker');
    const sitcker = (await pb.collection('stickers').getFullList()).filter(
        sticker => sticker.key === targetSticker
    );

    await interaction.reply({
        embeds: [
            {
                title: 'Sticker Preview',
                image: {
                    url: sitcker[0].url,
                },
                color: 0x010409,
            },
        ],
        ephemeral: true,
    });
};
