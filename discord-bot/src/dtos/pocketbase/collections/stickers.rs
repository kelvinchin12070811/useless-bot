use serde::Deserialize;

/***********************************************************************************************************************
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 **********************************************************************************************************************/
#[derive(Deserialize)]
pub struct ListStickers {
    pub page: usize,
    pub per_page: usize,
    pub total_pages: usize,
    pub total_items: usize,
    pub items: Vec<Sticker>,
}

impl Default for ListStickers {
    fn default() -> Self {
        Self {
            page: 0,
            per_page: 0,
            total_pages: 0,
            total_items: 0,
            items: Vec::new(),
        }
    }
}

#[derive(Deserialize)]
pub struct Sticker {
    pub id: String,
    pub collection_id: String,
    pub collection_name: String,
    pub created: String,
    pub updated: String,
    pub keyword: String,
    pub uri: String,
}

impl Default for Sticker {
    fn default() -> Self {
        Self {
            id: Default::default(),
            collection_id: Default::default(),
            collection_name: Default::default(),
            created: Default::default(),
            updated: Default::default(),
            keyword: Default::default(),
            uri: Default::default(),
        }
    }
}
