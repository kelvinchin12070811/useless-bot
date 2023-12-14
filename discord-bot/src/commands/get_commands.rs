use crate::{commands::common, types::Error};

pub fn get_commands() -> Vec<poise::Command<crate::types::Data, Error>> {
    vec![common::ping()]
}
