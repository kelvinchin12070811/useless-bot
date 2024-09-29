/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { AutocompleteInteraction } from 'discord.js';
import { StickerCollection } from '../dto/sticker';
import { logger } from '../logger';
import { pb } from '../store/pbstore';
import { AutocompleteReducer } from './index';

export const sticker: AutocompleteReducer = async interaction => {
    const subcommand = interaction.options.getSubcommand();
    const query = interaction.options.getFocused(true);

    switch (subcommand) {
        case 'send':
        case 'preview':
            if (query.name !== 'sticker') return;
            await searchSticker(query.value, interaction);
            break;
        case 'simple-list':
            if (query.name !== 'keyword') return;
            await searchSticker(query.value, interaction);
            break;
    }
};

const searchSticker = async (key: string, interaction: AutocompleteInteraction) => {
    try {
        const stickers = await pb
            .collection<Pick<StickerCollection, 'key'>>('stickers')
            .getFullList(25, {
                filter: `key~"${key || ''}"`,
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
