use crate::config::Config;

pub struct Data {
    pub config: Config,
}

pub type Error = Box<dyn std::error::Error + Send + Sync>;
pub type Context<'a> = poise::Context<'a, Data, Error>;
