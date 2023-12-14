mod commands;
mod config;
mod types;

use commands::get_commands;
use config::Config;
use poise::serenity_prelude as serenity;
use std::env;
use types::Data;

#[tokio::main]
async fn main() {
    let config = Config {
        bot_token: match env::var("BOT_TOKEN") {
            Ok(val) => val,
            Err(_e) => panic!("Error, token is required but it seems to be not provided!"),
        },
        api_username: match env::var("API_USERNAME") {
            Ok(val) => val,
            Err(_e) => panic!("Error, username is required but it seems to be not provided!"),
        },
        api_password: match env::var("API_PASSWORD") {
            Ok(val) => val,
            Err(_e) => panic!("Error, password is required but it seems to be not provided!"),
        },
    };

    let framework = poise::Framework::builder()
        .options(poise::FrameworkOptions {
            commands: get_commands::get_commands(),
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

    framework.run().await.unwrap();
}
