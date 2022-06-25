// import knex from "knex";
// const { dbConfig } = require("../../utils/knexFileSQLite");

// class DB {
//   connection: any;

//   constructor() {
//     // const environment = process.env.NODE_ENV || 'development';
//     // console.log(`SETTING ${environment} DB`);
//     // const options = dbConfig[environment];
//     this.connection = knex(dbConfig);
//   }

//   init() {
//     this.connection.schema.hasTable("mensajes").then((exists: boolean) => {
//       if (exists) {
//         // this.connection.schema.dropTable('mensajes');
//         // console.log("Tabla mensajes borrada")
//         return;
//       }
//       console.log("Creamos la tabla de mensajes!");

//       return this.connection.schema.createTable(
//         "mensajes",
//         async (mensajesTable: {
//           increments: () => void;
//           string: (arg0: string) => {
//             (): any;
//             new(): any;
//             notNullable: { (): void; new(): any };
//           };
//           integer: (arg0: string) => {
//             (): any;
//             new(): any;
//             notNullable: { (): void; new(): any };
//             unsigned: {
//               (): {
//                 (): any;
//                 new(): any;
//                 references: {
//                   (arg0: string): {
//                     (): any;
//                     new(): any;
//                     inTable: { (arg0: string): void; new(): any };
//                   };
//                   new(): any;
//                 };
//               };
//               new(): any;
//             };
//           };
//           decimal: (arg0: string, arg1: number, arg2: number) => void;
//           timestamps: (arg0: boolean, arg1: boolean) => void;
//         }) => {
//           mensajesTable.increments();
//           mensajesTable.string("nombre").notNullable();
//           mensajesTable.string("mensaje").notNullable();
//           mensajesTable.timestamps(true, true);
//         }
//       );
//     });
//   }

//   get(tableName: any, id: string) {
//     if (id) return this.connection(tableName).where("id", id);

//     return this.connection(tableName);
//   }

//   create(tableName: string, data: { nombre: string; mensaje: string }) {
//     // console.log("Guardando mensaje en la bd: ", data);
//     console.log(tableName, data)
//     return this.connection(tableName).insert(data);
//   }

//   update(tableName: any, id: string, data: Object) {
//     return this.connection(tableName).where("id", id).update(data);
//   }

//   delete(tableName: any, id: string) {
//     return this.connection(tableName).where("id", id).del();
//   }
// }

// export const DBService = new DB();
