import initSqlJs from "sql.js";

const sqlPromise = await initSqlJs({
    locateFile: filename => `${window.location.origin}/skeletal-growth-website/assets/sql-wasm.wasm`
});
console.log('sql.js loaded.')

const dataPromise = fetch("/skeletal-growth-website/assets/databases/skeletal-growth.db").then(res => res.arrayBuffer());
const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
export const db = new SQL.Database(new Uint8Array(buf));
console.log('sqlite database loaded.');

