/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandReducer } from '../command';
import { pb } from '../../store/pbstore';
import { StickerCollection } from '../../dto/sticker';

export const send: CommandReducer = async interaction => {
    const targetSticker = interaction.options.getString('sticker');
    try {
        const sticker = await pb
            .collection<StickerCollection>('stickers')
            .getFirstListItem(`key="${targetSticker}"`);
        await interaction.reply(sticker.url);
    } catch (error) {
        await interaction.reply({ content: `Sticker ${targetSticker} not found`, ephemeral: true });
    }
};
