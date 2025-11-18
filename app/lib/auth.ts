// import { betterAuth } from "better-auth";
// import {
//   createAdapterFactory,
//   type DBAdapterDebugLogOption,
// } from "better-auth/adapters";

// // Your custom adapter config options
// interface CustomAdapterConfig {
//   /**
//    * Helps you debug issues with the adapter.
//    */
//   debugLogs?: DBAdapterDebugLogOption;
//   /**
//    * If the table names in the schema are plural.
//    */
//   usePlural?: boolean;
// }
// export const myAdapter = (config: CustomAdapterConfig = {}) =>
//   createAdapterFactory({
//     config: {
//       adapterId: "custom-adapter", // A unique identifier for the adapter.
//       adapterName: "Custom Adapter", // The name of the adapter.
//       usePlural: config.usePlural ?? false, // Whether the table names in the schema are plural.
//       debugLogs: config.debugLogs ?? false, // Whether to enable debug logs.
//       supportsJSON: false, // Whether the database supports JSON. (Default: false)
//       supportsDates: true, // Whether the database supports dates. (Default: true)
//       supportsBooleans: true, // Whether the database supports booleans. (Default: true)
//       supportsNumericIds: true, // Whether the database supports auto-incrementing numeric IDs. (Default: true)
//     },
//     adapter: () => {
//       return {
//         create: async ({ model, data, select }) => {
//           // Example of inserting data into the database.
//           //   return await db.insert(model).values(data);
//         },
//         update: async ({ model, where, update }) => {
//           // Example of updating data in the database.
//           //   return await db.update(model).set(update).where(where);
//         },
//         updateMany: async ({ model, where, update }) => {
//           //   return await db.update(model).set(update).where(where);
//         },
//         delete: async ({ model, where }) => {
//           // Example of deleting a record from the database.
//           //   await db.delete(model).where(where);
//         },
//         deleteMany: async ({ model, where }) => {
//           // Example of deleting multiple records from the database.
//           //   return await db.delete(model).where(where);
//         },
//         findOne: async ({ model, where, select }) => {
//           //   return await db.select().from(model).where(where).limit(1);
//         },
//         findMany: async ({ model, where, limit, sortBy, offset }) => {
//           // Example of finding multiple records in the database.
//           //   return await db
//           //     .select()
//           //     .from(model)
//           //     .where(where)
//           //     .limit(limit)
//           //     .offset(offset)
//           //     .orderBy(sortBy);
//         },
//         count: async ({ model, where }) => {
//           // Example of counting the number of records in the database.
//           //   return await db.select().from(model).where(where).count();
//         },
//       };
//     },
//   });

// export const auth = betterAuth({
//   //...
// });
