const { TextDecoder } = require('util');
const sqlite3 = require('sqlite3').verbose();
const { parse } = require('csv-parse/sync');

async function importData(req, res) {
  try {
    const db = new sqlite3.Database('./db/mi_base_de_datos.db', (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return res.status(500).send('Error al conectar con la base de datos');
      } else {
        console.log('Conexión exitosa a la base de datos SQLite.');
      }
    });

    const csvData = req.body.csvFile;
    console.log("Body:");
    console.log(req.body.csvFile);

    // Decodificar y analizar los datos CSV
    const decodedCsvData = csvData.toString();

    // Split the csvData by newline character
    const lines = decodedCsvData.split('\r\n');

    var skippedCount = 0;
    // Prepare SQL statement for insertion
    const insertSQL = `
      INSERT INTO ServiceTransaction (
        TransactionID, PropertyId, BuildingId, OwnerId, 
        ServiceDescription, TransactionDate, ServicePrice
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Iterate over each line and insert data into the table
    db.serialize(() => {
      const stmt = db.prepare(insertSQL);
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip if line is empty
        if (line === '') continue;

        // Split the line by comma
        const lineArray = line.split(',');

        // Extract values
        const [transactionId, propertyId, buildingId, ownerId, serviceDescription, transactionDate, servicePrice] = lineArray;
        
        // Execute insert statement
        stmt.run([
          transactionId, propertyId, buildingId, ownerId,
          serviceDescription, transactionDate, servicePrice
        ], (err) => {
          if (err) {
            if (err.errno === 19) { // SQLite constraint violation code
              console.log(`Skipping line with TransactionID ${transactionId} because it already exists.`);
              skippedCount++;
              return;
          } else {
            console.log('Inserted successfully');
          }}
        });
      }
      stmt.finalize((err) => {
        if (err) {
          console.error('Error al finalizar la sentencia:', err);
          res.status(500).send('Error al insertar datos en la base de datos');
        } else {
          res.status(200).send('Datos importados correctamente');
        }
      });
    });

    console.log("Added transactions:  " + skippedCount)

    // Cerrar la base de datos después de finalizar todas las operaciones
    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la base de datos:', err);
      } else {
        console.log('Conexión a la base de datos cerrada.');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error. Please try again" });
  }
}

async function getDatas(req, res){

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
            db.all('SELECT * FROM ServiceTransaction', (err, rows) => {
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

async function filterData(req, res) {
  try {
    // Extract month and propertyId from request

    // Connect to the SQLite database
    const db = new sqlite3.Database('./db/mi_base_de_datos.db', (err) => {
      if (err) {
        console.error('Error connecting to the database:', err.message);
        res.status(500).json({ error: 'Error connecting to the database.' });
      }
    });

    // SQL query to filter service charges based on month and propertyId
    const query = `
      SELECT * FROM ServiceTransaction
      WHERE substr(TransactionDate, 6, 2) = ?
    `;

    // Execute the query
    const { month, PropertyID } = req.headers;
    console.log(month, PropertyID);
    db.all(query, [`${month}`.padStart(2, '0')], (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(500).json({ error: 'Error executing query.' });
      }
      
      // Send the filtered service charges as response
      console.log(rows);
      res.json(rows);

      // Close the database connection
      db.close((err) => {
        if (err) {
          console.error('Error closing the database connection:', err.message);
        }
      });
    });
  } catch (error) {
    console.error('Error filtering service charges:', error);
    res.status(500).json({ error: 'An error occurred while filtering service charges.' });
  }
}


module.exports = { importData, getDatas, filterData };
