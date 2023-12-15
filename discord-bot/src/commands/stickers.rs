/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/

use crate::types::{Context, Result};

#[poise::command(slash_command, subcommands("list"))]
pub async fn sticker(ctx: Context<'_>) -> Result {
    ctx.say("Stickers are so coo!").await?;
    Ok(())
}

/// List all the available stickers.
#[poise::command(slash_command)]
pub async fn list(ctx: Context<'_>) -> Result {
    ctx.say("hello world").await?;
    Ok(())
}
