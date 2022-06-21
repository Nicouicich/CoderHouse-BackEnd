"use strict";

var dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: '../mydb.sqlite'
  },
  useNullAsDefault: true
};
module.exports = {
  dbConfig: dbConfig
};