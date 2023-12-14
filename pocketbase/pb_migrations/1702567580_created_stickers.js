/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "w24edg0i8srys1e",
    "created": "2023-12-14 15:26:20.699Z",
    "updated": "2023-12-14 15:26:20.699Z",
    "name": "stickers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ulhux1ps",
        "name": "keyword",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fc8ydofk",
        "name": "uri",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("w24edg0i8srys1e");

  return dao.deleteCollection(collection);
})
