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

impl APIAuthTokenContext {
    fn get_token(&self) -> &str {
        &self.token
    }

    fn set_token(&mut self, token: String) {
        self.token = token;
    }

    fn get_created_at(&self) -> &DateTime<chrono::Utc> {
        &self.created_at
    }

    fn set_created_at(&mut self, created_at: DateTime<chrono::Utc>) {
        self.created_at = created_at;
    }

    fn get_expired_date(&self) -> &DateTime<chrono::Utc> {
        &self.expired_date
    }

    fn set_expired_date(&mut self, expired_date: DateTime<chrono::Utc>) {
        self.expired_date = expired_date;
    }
}
