use crate::contexts::config_context::ConfigContext;

pub struct Data {
    pub config: ConfigContext,
}

pub type Error = Box<dyn std::error::Error + Send + Sync>;
pub type Context<'a> = poise::Context<'a, Data, Error>;
pub type Result = std::result::Result<(), Error>;
