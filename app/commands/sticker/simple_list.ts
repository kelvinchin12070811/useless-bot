/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { StickerCollection } from '../../dto/sticker';
import { logger } from '../../logger';
import { pb } from '../../store/pbstore';
import { debugLog } from '../../utils/functional';
import { CommandReducer } from '../command';

export const simpleList: CommandReducer = async interaction => {
    const keyword = interaction.options.getString('keyword');
    debugLog(`keyword is ${keyword}`);

    if (keyword == null) {
        const stickers = await pb.collection('stickers').getFullList({ sort: '+key' });
        await interaction.reply({
            content:
                stickers.length === 0
                    ? '*No sticker avaliable*'
                    : stickers.map(sticker => sticker.key).join(', '),
            ephemeral: true,
        });
        return;
    }

    const stickers = await pb
        .collection<StickerCollection>('stickers')
        .getFullList({ filter: `key~"${keyword}"`, sort: '+key' });
    await interaction.reply({
        content:
            stickers.length === 0
                ? `*No sticker matched with "${keyword}" found*`
                : stickers.map(sticker => sticker.key).join(', '),
        ephemeral: true,
    });
};
