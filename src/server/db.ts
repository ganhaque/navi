// import Database from 'better-sqlite3';
//
// // const db = new Database('../cats.db', { verbose: console.log });
// const db = new Database('./cats.db', { verbose: console.log });
// console.log(db);

const db = require('better-sqlite3')('./data/booklet.db', []);

export default db;
