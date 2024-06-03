const { TextDecoder } = require('util');
const sqlite3 = require('sqlite3').verbose();
const { parse } = require('csv-parse/sync');


async function getDatap(req, res){

    try {
      const db = new sqlite3.Database('./db/mi_base_de_datos.db', (err) => {
        if (err) {
          console.error('Error al conectar con la base de datos:', err);
          return res.status(500).send('Error al conectar con la base de datos');
        } else {
          console.log('Conexión exitosa a la base de datos SQLite.');
        }
      });
  
      try {
          const data = await new Promise((resolve, reject) => {
              db.all('SELECT * FROM Property', (err, rows) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(rows);
                  }
              });
          });
          console.log("data");
          console.log(data);
          res.json(data);
      } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Error fetching data' });
      }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error. Please try again" });
  }
  }
  
  
  module.exports = { getDatap };