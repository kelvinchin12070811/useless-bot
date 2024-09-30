/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandReducer } from '../command';

export const choice: CommandReducer = async interaction => {
    const choices: string[] = (interaction.options.getString('choices') ?? '')
        .split(',')
        .map((choice: string) => choice.trim());

    if (choices.length <= 0) {
        await interaction.reply({
            content: 'You need to provide at least two choices.',
            ephemeral: true,
        });
        return;
    }

    const choice = choices[Math.floor(Math.random() * choices.length)];
    await interaction.reply(choice);
};
