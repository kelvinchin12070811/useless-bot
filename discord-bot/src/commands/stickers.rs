/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
use crate::{
    services::sticker_service,
    types::{Context, Result},
};

#[poise::command(slash_command, subcommands("list"))]
pub async fn sticker(ctx: Context<'_>) -> Result {
    ctx.say("Stickers are so coo!").await?;
    Ok(())
}

/// List all the available stickers.
#[poise::command(slash_command)]
pub async fn list(ctx: Context<'_>) -> Result {
    let config_context = &ctx.data().config_context;
    let stickers = {
        let api_auth_token_context = ctx.data().api_auth_context.clone();
        sticker_service::get_all_stickers(&config_context, api_auth_token_context).await
    };
    if let None = stickers {
        return Ok(());
    }

    ctx.say(stickers.unwrap().join(", ")).await?;

    Ok(())
}
