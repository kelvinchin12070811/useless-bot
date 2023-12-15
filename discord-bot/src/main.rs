mod commands;
mod contexts;
mod dtos;
mod events;
mod services;
mod types;

use commands::get_commands;
use env_logger::Builder;
use log::{error, info, LevelFilter};
use poise::serenity_prelude as serenity;
use std::env;
use types::Data;

use crate::{
    contexts::{api_auth_token_context::APIAuthTokenContext, config_context::ConfigContext},
    services::api_service,
};

fn parse_config() -> ConfigContext {
    ConfigContext {
        bot_token: match env::var("BOT_TOKEN") {
            Ok(val) => val,
            Err(_e) => {
                error!("Error, token is required but it seems to be not provided!");
                panic!()
            }
        },
        api_username: match env::var("API_USERNAME") {
            Ok(val) => val,
            Err(_e) => {
                error!("Error, username is required but it seems to be not provided!");
                panic!()
            }
        },
        api_password: match env::var("API_PASSWORD") {
            Ok(val) => val,
            Err(_e) => {
                error!("Error, password is required but it seems to be not provided!");
                panic!()
            }
        },
        db_url: match env::var("DB_URL") {
            Ok(val) => val,
            Err(_e) => {
                error!("Error, database url is required but it seems to be not provided!");
                panic!()
            }
        },
        token_expired_duration: match env::var("TOKEN_EXPIRED_DURATION") {
            Ok(val) => val.parse::<u64>().unwrap(),
            Err(_e) => {
                error!(
                    "Error, token expired duration is required but it seems to be not provided!"
                );
                panic!()
            }
        },
    }
}

#[tokio::main]
async fn main() {
    Builder::new()
        .filter_module("useless_bot", LevelFilter::Trace)
        .init();

    info!("Starting useless-bot...");
    info!("Reading environment variable...");
    let config = parse_config();
    let mut api_auth_token_context: APIAuthTokenContext = Default::default();
    let _token = api_service::get_auth_token(&config, &mut api_auth_token_context).await;

    info!("Building framework...");
    let framework = poise::Framework::builder()
        .options(poise::FrameworkOptions {
            commands: get_commands::get_commands(),
            event_handler: |ctx, event, framework, data| {
                Box::pin(events::default_event_handler::default_event_handler(
                    ctx, event, framework, data,
                ))
            },
            ..Default::default()
        })
        .token(config.bot_token.clone())
        .intents(serenity::GatewayIntents::non_privileged())
        .setup(move |ctx, _ready, framework| {
            Box::pin(async move {
                poise::builtins::register_globally(ctx, &framework.options().commands).await?;
                Ok(Data { config: config })
            })
        });

    info!("Running framework...");
    framework.run().await.unwrap();
}
