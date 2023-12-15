/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
use crate::{commands::common, types::Error};

pub fn get_commands() -> Vec<poise::Command<crate::types::Data, Error>> {
    vec![common::ping()]
}
