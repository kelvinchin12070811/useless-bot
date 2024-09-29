/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandReducer } from '../command';
import { coin } from './coin';
import { dice } from './dice';

const commandJumpTable: Record<string, CommandReducer> = {
    dice,
    coin,
};

export const random: CommandReducer = async interaction => {
    const subcommand = interaction.options.getSubcommand();
    const command = commandJumpTable[subcommand];

    if (command) {
        return command(interaction);
    }

    await interaction.reply({ content: `Unknown subcommand \"${subcommand}\"`, ephemeral: true });
};
