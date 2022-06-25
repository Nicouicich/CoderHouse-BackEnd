// import knex from 'knex';
// const { dbConfig } = require('../../utils/knexFileMySQL');

// class DB {
//   connection: any;

//   constructor() {
//     // const environment = process.env.NODE_ENV || 'development';
//     // console.log(`SETTING ${environment} DB`);
//     // const options = dbConfig[environment];
//     this.connection = knex(dbConfig);
//   }

//   init() {
//     this.connection.schema.hasTable('productos').then((exists: boolean) => {
//       if (exists){
//         // this.connection.schema.dropTable('productos');
//         // console.log("Tabla productos borrada")
//         return
//       }
//       console.log('Creamos la tabla productos!');

//       return this.connection.schema.createTable(
//         'productos',
//         async (productosTable: { increments: () => void; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; integer: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; unsigned: { (): { (): any; new(): any; references: { (arg0: string): { (): any; new(): any; inTable: { (arg0: string): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; decimal: (arg0: string, arg1: number, arg2: number) => void; timestamps: (arg0: boolean, arg1: boolean) => void; }) => {
//           productosTable.increments();
//           productosTable.string('nombre').notNullable();
//           productosTable.string('descripcion').notNullable();
//           productosTable.integer('stock').notNullable();
//           productosTable.decimal('precio', 4, 2);
//           productosTable.timestamps(true, true);
          
//           const initProducts = [
//             {
//               nombre: 'cartuchera',
//               descripcion: 'Linda Cartuchera',
//               stock: 20,
//               precio: '10.5',
//             },
//             {
//               nombre: 'pendrive',
//               descripcion: 'pendrive 32gb',
//               stock: 20,
//               precio: '99.4',
//             },
//           ];

    
//           await  this.connection('productos').insert(initProducts)
//         }
//       );
//     });
//   }

//   get(tableName: any, id: string) {
//     if (id) return this.connection(tableName).where('id', id);

//     return this.connection(tableName);
//   }

//   create(tableName: string, data: { nombre: string; descripcion?: string; stock?: number; precio?: string; category_id?: number; }) {
//     return this.connection(tableName).insert(data);
//   }

//   update(tableName: any, id: string, data: Object) {
//     return this.connection(tableName).where('id', id).update(data);
//   }

//   delete(tableName: any, id: string) {
//     return this.connection(tableName).where('id', id).del();
//   }
// }

// export const DBService = new DB();