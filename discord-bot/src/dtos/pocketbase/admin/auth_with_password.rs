use serde::Deserialize;

#[derive(Deserialize)]
pub struct AuthWithPassword {
    pub token: String,
    pub admin: Admin,
}

impl Default for AuthWithPassword {
    fn default() -> Self {
        Self {
            token: Default::default(),
            admin: Default::default(),
        }
    }
}

#[derive(Deserialize)]
pub struct Admin {
    pub id: String,
    pub created: chrono::DateTime<chrono::Utc>,
    pub updated: chrono::DateTime<chrono::Utc>,
    pub email: String,
    pub avatar: i32,
}

impl Default for Admin {
    fn default() -> Self {
        Self {
            id: Default::default(),
            created: Default::default(),
            updated: Default::default(),
            email: Default::default(),
            avatar: Default::default(),
        }
    }
}

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InN5d2JoZWNuaDQ2cmhtMCIsInR5cGUiOiJhZG1pbiIsImV4cCI6MjIwODk4MTYwMH0.han3_sG65zLddpcX2ic78qgy7FKecuPfOpFa8Dvi5Bg",
//   "admin": {
//     "id": "b6e4b08274f34e9",
//     "created": "2022-06-22 07:13:09.735Z",
//     "updated": "2022-06-22 07:13:09.735Z",
//     "email": "test@example.com",
//     "avatar": 0
//   }
// }
