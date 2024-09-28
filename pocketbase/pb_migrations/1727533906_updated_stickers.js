/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9wmr4g8qizejrj3")

  // remove
  collection.schema.removeField("trkxz4va")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9wmr4g8qizejrj3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "trkxz4va",
    "name": "created_time",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
