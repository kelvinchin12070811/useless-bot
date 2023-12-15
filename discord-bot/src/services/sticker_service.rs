/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
use crate::api_service;
use crate::contexts::{api_auth_token_context::APIAuthTokenContext, config_context::ConfigContext};
use crate::dtos::pocketbase::collections;
use log::{error, info};
use std::sync::{Arc, Mutex};

pub async fn get_all_stickers(
    config_context: &ConfigContext,
    api_auth_token_context: Arc<Mutex<APIAuthTokenContext>>,
) -> Option<Vec<String>> {
    let token = api_service::get_auth_token(config_context, api_auth_token_context.clone()).await;
    if token.is_empty() {
        return None;
    }

    let url = {
        let mut builder = config_context.get_db_url();
        builder
            .add_route("api/collections/stickers/records")
            .add_param("sort", "+keyword");
        builder.build()
    };
    info!("Fetching stickers from {}", url);

    let client = reqwest::Client::new();
    let request = client.get(url).bearer_auth(token).send().await;

    if let Err(e) = request {
        error!("Error occurred while fetching stickers, {}", e);
        return None;
    }

    let response = request
        .unwrap()
        .json::<collections::stickers::ListStickers>()
        .await
        .unwrap();

    Some(
        response
            .items
            .iter()
            .map(|itr| itr.keyword.clone())
            .collect(),
    )
}
