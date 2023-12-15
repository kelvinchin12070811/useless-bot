/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
use std::{collections::HashMap, ops::Add};

use crate::dtos::pocketbase::admin::auth_with_password::AuthWithPassword;
use chrono::Utc;
use log::{error, info};

use crate::contexts::{api_auth_token_context::APIAuthTokenContext, config_context::ConfigContext};

/// Authenticate and get token from the PocketBase API, and update the auth context.
pub async fn db_auth(config_context: &ConfigContext, auth_token_context: &mut APIAuthTokenContext) {
    let mut request_body = HashMap::new();
    request_body.insert("identity", config_context.api_username.clone());
    request_body.insert("password", config_context.api_password.clone());

    let client = reqwest::Client::new();
    let response = client
        .post(format!(
            "{}/api/admins/auth-with-password",
            config_context.db_url
        ))
        .json(&request_body)
        .send()
        .await;

    if let Err(e) = response {
        error!("Failed to auth to db with this error: {}", e);
        return;
    }

    let response = match response.unwrap().json::<AuthWithPassword>().await {
        Ok(content) => content,
        Err(_e) => Default::default(),
    };
    info!("Auth successfully.");

    let token_created_date = Utc::now();
    auth_token_context.set_token(response.token.clone());
    auth_token_context.set_created_at(token_created_date);
    auth_token_context.set_expired_date(token_created_date.add(chrono::Duration::seconds(
        config_context.token_expired_duration as i64,
    )));
}

pub async fn get_auth_token(
    config_context: &ConfigContext,
    auth_token_context: &mut APIAuthTokenContext,
) -> String {
    let is_token_expired = auth_token_context.get_expired_date() <= &Utc::now();

    if is_token_expired {
        db_auth(&config_context, auth_token_context).await;
    }

    let token = auth_token_context.get_token().to_string();
    token
}
