/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
use chrono::DateTime;

pub struct APIAuthTokenContext {
    token: String,
    created_at: DateTime<chrono::Utc>,
    expired_date: DateTime<chrono::Utc>,
}

impl Default for APIAuthTokenContext {
    fn default() -> Self {
        Self {
            token: String::new(),
            created_at: chrono::Utc::now(),
            expired_date: chrono::Utc::now(),
        }
    }
}

#[allow(dead_code)]
impl APIAuthTokenContext {
    pub fn get_token(&self) -> &str {
        &self.token
    }

    pub fn set_token(&mut self, token: String) {
        self.token = token;
    }

    pub fn get_created_at(&self) -> &DateTime<chrono::Utc> {
        &self.created_at
    }

    pub fn set_created_at(&mut self, created_at: DateTime<chrono::Utc>) {
        self.created_at = created_at;
    }

    pub fn get_expired_date(&self) -> &DateTime<chrono::Utc> {
        &self.expired_date
    }

    pub fn set_expired_date(&mut self, expired_date: DateTime<chrono::Utc>) {
        self.expired_date = expired_date;
    }
}
