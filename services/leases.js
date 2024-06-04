const { TextDecoder } = require('util');
const sqlite3 = require('sqlite3').verbose();
const { parse } = require('csv-parse/sync');

async function getLease(req, res){

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
            db.all('SELECT * FROM Lease', (err, rows) => {
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

async function postLease(req, res) {
    const { LeaseID, ClientID, PropertyID, BuildingID, OwnerID, LeaseExpDate, LeaseAmount } = req.body;
  
    if (!LeaseID || !ClientID || !PropertyID || !BuildingID || !OwnerID || !LeaseExpDate || !LeaseAmount) {
      return res.status(400).send('Todos los campos son obligatorios');
    }
  
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
        const updateQuery = `
          UPDATE Lease
          SET ClientID = ?, PropertyID = ?, BuildingID = ?, OwnerID = ?, LeaseExpDate = ?, LeaseAmount = ?
          WHERE LeaseID = ?
        `;
        const params = [ClientID, PropertyID, BuildingID, OwnerID, LeaseExpDate, LeaseAmount, LeaseID];
  
        await new Promise((resolve, reject) => {
          db.run(updateQuery, params, function (err) {
            if (err) {
              reject(err);
            } else if (this.changes === 0) {
              reject(new Error('No se encontró el registro con el ID especificado'));
            } else {
              resolve();
            }
          });
        });
  
        res.status(200).send('Registro actualizado con éxito');
      } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Error updating data' });
      } finally {
        db.close((err) => {
          if (err) {
            console.error('Error al cerrar la base de datos:', err);
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error. Please try again" });
    }
}
  
module.exports = {getLease, postLease };
