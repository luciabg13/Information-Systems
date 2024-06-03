const sqlite3 = require('sqlite3').verbose();

// Conect to Database
const db = new sqlite3.Database('./db/mi_base_de_datos.db', (err) => {
  if (err) {
    console.error('Connection Error:', err.message);
  } else {
    console.log('Connected to SQLite');
  }
});

// Delete all tables
const dropTables = () => {
  db.serialize(() => {

    db.run('PRAGMA foreign_keys = OFF;', handleError);
    // Delete table ServiceTransaction
    db.run(`DROP TABLE IF EXISTS ServiceTransaction`, handleError);

    // Delete table Lease
    db.run(`DROP TABLE IF EXISTS Lease`, handleError);

    // Delete table Client
    db.run(`DROP TABLE IF EXISTS Client`, handleError);

    // Delete table Property
    db.run(`DROP TABLE IF EXISTS Property`, handleError);

    // Delete table Owner
    db.run(`DROP TABLE IF EXISTS Owner`, handleError);

    // Delete table Building
    db.run(`DROP TABLE IF EXISTS Building`, handleError);
  });
};

// Handling errors
const handleError = (err) => {
  if (err) {
    console.error('Error deleting table:', err.message);
  } else {
    console.log('Table deleted or not existed.');
  }
};

// Drop all tables from the database
dropTables();
console.log('Tables dropped');

// Close connection to the database
db.close((err) => {
  if (err) {
    console.error('Error closing connection:', err.message);
  } else {
    console.log('Closed connection to SQLite');
  }
});
