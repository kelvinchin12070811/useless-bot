/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { StickerCollection } from '../dto/sticker';
import { logger } from '../logger';
import { pb } from '../store/pbstore';
import { AutocompleteReducer } from './index';

export const sticker: AutocompleteReducer = async interaction => {
    const query = interaction.options.getFocused();
    try {
        const stickers = await pb
            .collection<Pick<StickerCollection, 'key'>>('stickers')
            .getFullList(25, {
                filter: `key~"${query || ''}"`,
                sort: '+key',
                fields: 'key',
            });
        await interaction.respond(
            stickers.map(sticker => ({ name: sticker.key, value: sticker.key }))
        );
        return;
    } catch (e) {
        logger.warn(`[Autocomplete][Stickers] Failed to get stickers: ${e}`);
        await interaction.respond([]);
    }
};
