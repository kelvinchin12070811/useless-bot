/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9wmr4g8qizejrj3")

  collection.indexes = [
    "CREATE INDEX `idx_kaa1dIT` ON `stickers` (`key`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9wmr4g8qizejrj3")

  collection.indexes = []

  return dao.saveCollection(collection)
})
