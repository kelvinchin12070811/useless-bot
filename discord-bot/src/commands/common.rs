use crate::types::{Context, Result};
use chrono::Utc;

/// Get the bot's latency
#[poise::command(slash_command)]
pub async fn ping(ctx: Context<'_>) -> Result {
    let created = ctx.created_at();
    let current = Utc::now();
    let latency = current.timestamp_millis() - created.timestamp_millis();

    ctx.say(format!(":ping_pong: Pong!\nArrived in `{} ms`", latency))
        .await?;
    Ok(())
}

// A test of context menu command
// #[poise::command(context_menu_command = "What this")]
// pub async fn what_this(ctx: Context<'_>, message: serenity::Message) -> Result {
//     message
//         .reply(ctx, format!("It say: \"{}\"", message.content))
//         .await?;
//     ctx.send(|reply| {
//         reply.ephemeral = true;
//         reply.content = Some(String::from("Done!"));
//         reply
//     })
//     .await?;
//     Ok(())
// }
