/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
use crate::contexts::{api_auth_token_context::APIAuthTokenContext, config_context::ConfigContext};
use std::sync::{Arc, Mutex};

pub struct Data {
    pub config_context: ConfigContext,
    pub api_auth_context: Arc<Mutex<APIAuthTokenContext>>,
}

pub type Error = Box<dyn std::error::Error + Send + Sync>;
pub type Context<'a> = poise::Context<'a, Data, Error>;
pub type Result<T = ()> = std::result::Result<T, Error>;
