import knex from "knex";
const {mysql} = require( '../../src/utils/knexFileMySQL');

let Knex = knex(mysql);
Knex.schema
  .dropTable ('cars')
  .then(() => {
    console.log("Tabla Cars borrada")
  })

Knex.schema
  .createTable("cars", (table: { increments: (arg0: string) => void; string: (arg0: string) => void; integer: (arg0: string) => void; }) => {
    table.increments("id");
    table.string("name");
    table.integer("price");
  })
  .then(() => console.log("Table Created"))
  .catch((err: any) => {
    console.log("There was an error creating the table cars");
    console.log(err);
  });

