/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandReducer } from '../command';

const diceNumberEmojiMapping: Record<number, string> = {
    1: ':one:',
    2: ':two:',
    3: ':three:',
    4: ':four:',
    5: ':five:',
    6: ':six:',
};

export const dice: CommandReducer = async interaction => {
    const roll = Math.floor(Math.random() * 6) + 1;
    await interaction.reply({ content: diceNumberEmojiMapping[`${roll}`] });
};
