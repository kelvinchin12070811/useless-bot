/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { logger } from '../../logger';
import { pb } from '../../store/pbstore';
import { execIfNotProd, debugLog } from '../../utils/functional';
import { CommandReducer } from '../command';

export const preview: CommandReducer = async interaction => {
    const targetSticker = interaction.options.getString('sticker');

    debugLog(`Previewing sticker: ${targetSticker}`);
    try {
        const sitcker = await pb.collection('stickers').getFirstListItem(`key="${targetSticker}"`);
        debugLog(`sticker content: ${JSON.stringify(sitcker)}`);
        await interaction.reply({
            content: sitcker.url,
            ephemeral: true,
        });
    } catch (error) {
        logger.error(error);
        await interaction.reply({
            content: 'Sticker not found',
            ephemeral: true,
        });
        return;
    }
};
