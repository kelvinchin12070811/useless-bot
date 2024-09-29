/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
import { CommandReducer } from '../command';

const coinEmojiMapping: Record<number, string> = {
    0: '# :coin: Head!',
    1: '# :coin: Tail!',
};

export const coin: CommandReducer = async interaction => {
    const flip = Math.floor(Math.random() * 2);
    await interaction.reply({ content: coinEmojiMapping[flip] });
};
