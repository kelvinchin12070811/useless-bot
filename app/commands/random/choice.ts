/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { ApplicationCommandOptionType } from 'discord.js';
import { CommandDescriptor } from '../../constants/commands';
import { logger } from '../../logger';
import { CommandReducer } from '../command';

/**
 * Formate the outcome message to display the choices from the list from a list of template randomly.
 * @param choice The choice that was selected.
 * @param choices The list of choices to choose from.
 * @returns The formatted message.
 */
function randomMessage(choice: string, choices: string[]): string {
    const limit = 3;
    const index = Math.floor(Math.random() * limit);

    switch (index) {
        case 0:
            return `I choose \`${choice}\` from the list of choices: \`${choices.join(', ')}\``;
        case 1:
            return `I think \`${choice}\` is the best choice from the list of choices: \`${choices.join(', ')}\``;
        case 2:
            return `I would go with \`${choice}\` from the list of choices: \`${choices.join(', ')}\``;
        default:
            return '';
    }
}

/**
 * Formate the outcome message to display the only choice from the list from a list of template randomly.
 * @param choice The choice that was selected.
 * @returns The formatted message.
 */
function randomMessageForOneItem(choice: string): string {
    const limit = 3;
    const index = Math.floor(Math.random() * limit);

    switch (index) {
        case 0:
            return `What do you mean? \`${choice}\` is the only choice!`;
        case 1:
            return `Are you kidding me? There's just \`${choice}\`!`;
        case 2:
            return `Ho ho ho! I can only choose from \`${choice}\`!`;
        default:
            return '';
    }
}

export const choice: CommandReducer = async interaction => {
    const saperator: string = interaction.options.getString('saperator') ?? ',';
    const choices: string[] = (interaction.options.getString('choices') ?? '')
        .split(saperator)
        .map((choice: string) => choice.trim())
        .filter((choice: string) => choice.length > 0);

    logger.debug(`[random][choice] Saperator: ${saperator}`);
    logger.debug(`[random][choice] Length: ${choices.length}, Choices: ${JSON.stringify(choices)}`);

    if (choices.length <= 0) {
        await interaction.reply({
            content: 'You need to provide at least two choices.',
            ephemeral: true,
        });
        return;
    }

    if (choices.length === 1) {
        await interaction.reply(randomMessageForOneItem(choices[0]));
        return;
    }

    const choice = choices[Math.floor(Math.random() * choices.length)];
    await interaction.reply(randomMessage(choice, choices));
};

export const choiceCommandDescription: CommandDescriptor = {
    name: 'choice',
    description: 'Choose from a list of choices',
    type: ApplicationCommandOptionType.Subcommand,
    options: [
        {
            name: 'choices',
            description:
                'The choices to choose from, separated by comma or sepcified with the seperator option',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'saperator',
            description: 'The saperator to use to split the choices',
            type: ApplicationCommandOptionType.String,
        },
    ],
};
