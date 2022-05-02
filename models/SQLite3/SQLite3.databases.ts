import knex from "knex";

const { sqlite } = require("../../src/utils/knexFileSQLite");

let Knex = knex(sqlite);
Knex.schema
  .dropTable ('cars')
  .then(() => {
    console.log("Tabla Cars borrada")
  })

Knex.schema
  .createTable(
    "cars",
    (table: {
      increments: (arg0: string) => void;
      string: (arg0: string) => void;
      integer: (arg0: string) => void;
    }) => {
      table.increments("id");
      table.string("name");
      table.integer("price");
    }
  )
  .then(() => console.log("Table Created"))
  .catch((err: any) => {
    console.log("There was an error creating the table cars");
    console.log(err);
  })
  .finally(() => {
    Knex.destroy();
  });

const cars = [
  { name: "audi", price: 1000 },
  { name: "moto", price: 2000 },
  { name: "carr", price: 3000 },
  { name: "ford", price: 4000 },
  { name: "mercedes", price: 5000 },
  { name: "susuki", price: 6000 },
  { name: "chevrolet", price: 7000 },
];

Knex("cars")
  .insert(cars)
  .then(() => {
    console.log("Elementos agregados");
  })
  .catch((err: Error) => {
    console.log(err);
  })
  .finally(() => {
    Knex.destroy()
  });
