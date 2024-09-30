/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { ApplicationCommandOptionType } from 'discord.js';
import { CommandDescriptor } from '../../constants/commands';
import { logger } from '../../logger';
import { pb } from '../../store/pbstore';
import { execIfNotProd } from '../../utils/functional';
import { CommandReducer } from '../command';

export const preview: CommandReducer = async interaction => {
    const targetSticker = interaction.options.getString('sticker');

    logger.debug(`Previewing sticker: ${targetSticker}`);
    try {
        const sitcker = await pb.collection('stickers').getFirstListItem(`key="${targetSticker}"`);
        logger.debug(`sticker content: ${JSON.stringify(sitcker)}`);
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

export const previewCommandDescription: CommandDescriptor = {
    name: 'preview',
    description: 'Preview a sticker',
    type: ApplicationCommandOptionType.Subcommand,
    options: [
        {
            name: 'sticker',
            description: 'The sticker to preview, only you can see the message.',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        },
    ],
};
