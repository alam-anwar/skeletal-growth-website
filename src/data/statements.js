// import { initSqlJs } from "sql.js";

// const sqlPromise = initSqlJs({
//     locateFile: '/assets/sql-wasm.wasm'
// })

// const dataPromise = fetch("/assets/databases/skeletal-growth.db").then(res => res.arrayBuffer());
// const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
// export const db = new SQL.database(new Uint8Array(buf));