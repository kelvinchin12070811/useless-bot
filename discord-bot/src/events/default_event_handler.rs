use log::info;
use poise::serenity_prelude as serenity;

use crate::types::{Data, Error};

pub async fn default_event_handler(
    _ctx: &serenity::Context,
    event: &poise::Event<'_>,
    _framework: poise::FrameworkContext<'_, Data, Error>,
    _data: &Data,
) -> Result<(), Error> {
    match event {
        poise::Event::Ready { data_about_bot } => {
            info!("Bot {} is ready!", data_about_bot.user.name);
        }
        _ => {}
    }
    Ok(())
}
