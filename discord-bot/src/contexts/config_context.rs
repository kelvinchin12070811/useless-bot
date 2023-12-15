/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
pub struct ConfigContext {
    pub bot_token: String,
    pub api_username: String,
    pub api_password: String,
    pub db_url: String,
    pub token_expired_duration: u64,
}
