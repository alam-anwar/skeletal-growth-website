import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {defineCustomElements as jeepSqlite, JSX as LocalJSX} from "jeep-sqlite/loader"
// import {HTMLAttributes} from 'react';
// import {Capacitor} from '@capacitor/core';
// import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import React from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'
// import App from './App'
// import { Capacitor } from '@capacitor/core';
// import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
// import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';

// customElements.define('jeep-sqlite', JeepSqlite);

// window.addEventListener('DOMContentLoaded', async () => {
//     const platform = Capacitor.getPlatform();
//     const sqlite = new SQLiteConnection(CapacitorSQLite)
//     try {
//         if (platform === "web") {
//             // Create the 'jeep-sqlite' Stencil component
//             const jeepSqlite = document.createElement('jeep-sqlite');
//             document.body.appendChild(jeepSqlite);
//             await customElements.whenDefined('jeep-sqlite');
//             // Initialize the Web store
//             await sqlite.initWebStore();
//         }

//         const ret = await sqlite.checkConnectionsConsistency();
//         const isConn = (await sqlite.isConnection("skeletal-growth.db")).result;
//         var db = null;
//         if (ret.result && isConn) {
//             db = await sqlite.retrieveConnection("skeletal-growth.db");
//         } else {
//             db = await sqlite.createConnection("skeletal-growth.db", false, "no-encryption", 1);
//         }

//         await db.open();
//         let query = `
//             CREATE TABLE IF NOT EXISTS test (
//             id INTEGER PRIMARY KEY NOT NULL,
//             name TEXT NOT NULL
//             );
//         `

//         const res = await db.execute(query);
//         console.log(`res: ${JSON.stringify(res)}`);
//         await db.close();
//         await sqlite.closeConnection("skeletal-growth.db");

//         createRoot(document.getElementById('root')).render(
//             <React.StrictMode>
//                 <App />
//             </React.StrictMode>,
//         )
//     } catch (err) {
//         console.log(`Error: ${err}`);
//         throw new Error(`Error: ${err}`)
//     }
// });

