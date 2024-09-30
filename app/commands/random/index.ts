/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandDescriptor } from '../../constants/commands';
import { CommandReducer } from '../command';
import { choice, choiceCommandDescription } from './choice';
import { coin, coinCommandDescription } from './coin';
import { dice, diceCommandDescription } from './dice';

const commandJumpTable: Record<string, CommandReducer> = {
    dice,
    coin,
    choice,
};

export const random: CommandReducer = async interaction => {
    const subcommand = interaction.options.getSubcommand();
    const command = commandJumpTable[subcommand];

    if (command) {
        return command(interaction);
    }

    await interaction.reply({ content: `Unknown subcommand \"${subcommand}\"`, ephemeral: true });
};

export const randomCommandDescription: CommandDescriptor = {
    name: 'random',
    description: 'A sereis of functions that deals with random probability stuffs',
    options: [
        { ...diceCommandDescription },
        { ...coinCommandDescription },
        { ...choiceCommandDescription },
    ],
};
