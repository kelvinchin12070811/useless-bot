/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { logger } from '../../logger';
import { pb } from '../../store/pbstore';
import { debugLog } from '../../utils/functional';
import { MessageContextMenuCommandReducer } from '../command';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

async function fetchSticker(key: string) {
    try {
        const sticker = await pb.collection('stickers').getFirstListItem(`key="${key}"`);
        return sticker == null ? '' : sticker.url;
    } catch (e) {
        return '';
    }
}

export const replyWithSticker: MessageContextMenuCommandReducer = async interaction => {
    const modalID = `reply-with-sticker-prompt-${interaction.user.id}-${new Date().getUTCSeconds()}`;
    const modal = new ModalBuilder({
        customId: modalID,
        title: 'Reply with sticker',
    });

    const targetStickerActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder({
            customId: 'targetSticker',
            label: 'Which sticker to reply with?',
            style: TextInputStyle.Short,
        })
    );

    modal.addComponents(targetStickerActionRow);

    try {
        await interaction.showModal(modal);
        const modalInteraction = await interaction.awaitModalSubmit({
            filter: i => i.customId === modalID,
            time: 30_000,
        });
        const targetSticker = modalInteraction.fields.getTextInputValue('targetSticker');
        debugLog(`targetSticker is ${targetSticker}`);
        const stickerURL = await fetchSticker(targetSticker);

        if (stickerURL == '') {
            await modalInteraction.reply({
                content: `*No sticker matched with "${targetSticker}" found*`,
                ephemeral: true,
            });
            return;
        }

        modalInteraction.reply(
            interaction.targetMessage.author.bot
                ? `[sticker](${stickerURL})`
                : `<@${interaction.targetMessage.author.id}>\n[sticker](${stickerURL})`
        );
    } catch (e) {
        logger.error(e);
        await interaction.reply({
            content:
                'An error occurred while trying to reply with a sticker. Please try again later.',
            ephemeral: true,
        });
    }
};
