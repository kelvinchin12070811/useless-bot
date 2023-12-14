mod commands;
mod config;
mod events;
mod types;

use commands::get_commands;
use config::Config;
use env_logger::Builder;
use log::{error, info, LevelFilter};
use poise::serenity_prelude as serenity;
use std::env;
use types::Data;

#[tokio::main]
async fn main() {
    Builder::new()
        .filter_module("useless_bot", LevelFilter::Trace)
        .init();

    info!("Starting useless-bot...");
    info!("Reading environment variable...");
    let config = Config {
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
    };

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
