use std::collections::HashMap;

use log::{error, info};

use crate::contexts::{api_auth_token_context::APIAuthTokenContext, config_context::ConfigContext};

pub async fn db_auth(config_context: &ConfigContext, auth_token_context: &mut APIAuthTokenContext) {
    let mut request_body = HashMap::new();
    request_body.insert("identity", config_context.api_username.clone());
    request_body.insert("password", config_context.api_password.clone());

    let client = reqwest::Client::new();
    let response = client
        .post(format!(
            "{}/api/admins/auth-with-password",
            "http://localhost:8090"
        ))
        .json(&request_body)
        .send()
        .await;

    if let Err(e) = response {
        error!("Failed to auth to db with this error: {}", e);
        return;
    }

    let response = match response.unwrap().text().await {
        Ok(content) => content,
        Err(_e) => "".to_string(),
    };
    info!("auth response: {}", response);
}
