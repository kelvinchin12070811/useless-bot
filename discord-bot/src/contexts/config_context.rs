/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
use reqwest::Url;
use url_builder::URLBuilder;

pub struct ConfigContext {
    pub bot_token: String,
    pub api_username: String,
    pub api_password: String,
    pub db_url: String,
    pub token_expired_duration: u64,
}

impl ConfigContext {
    pub fn get_db_url(&self) -> URLBuilder {
        let url = Url::parse(&self.db_url).unwrap();
        let mut builder = URLBuilder::new();
        builder
            .set_protocol(url.scheme())
            .set_host(match url.host_str() {
                Some(host) => host,
                None => "localhost",
            })
            .set_port(match url.port() {
                Some(port) => port,
                None => 8090,
            });
        builder
    }
}
