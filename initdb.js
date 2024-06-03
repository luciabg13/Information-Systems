const sqlite3 = require('sqlite3').verbose();

// Create a new database
const db = new sqlite3.Database('./db/mi_base_de_datos.db', (err) => {
  if (err) {
    console.error('Error connecting to the Database:', err.message);
  } else {
    console.log('Connected to the Database');
  }
});

// Table creation
const createTables = () => {
  db.serialize(() => {
    // Create table Building
    db.run(`CREATE TABLE IF NOT EXISTS Building(
      BuildingId        INTEGER NOT NULL,
      BuildingType      VARCHAR(45) NOT NULL,
      BuildingLocation  VARCHAR(45) NOT NULL,
      PRIMARY KEY (BuildingId)
    )`, handleError);

    // Create table Owner
    db.run(`CREATE TABLE IF NOT EXISTS Owner(
      OwnerId             INTEGER NOT NULL,
      OwnerInformation    VARCHAR(45) NOT NULL,
      OwnerName           VARCHAR(45) NOT NULL,
      PRIMARY KEY (OwnerId)
    )`, handleError);

    // Create table Property
    db.run(`CREATE TABLE IF NOT EXISTS Property(
      PropertyId      INTEGER NOT NULL,
      BuildingId      INTEGER NOT NULL,
      OwnerId         INTEGER NOT NULL,
      PropertyType    VARCHAR(45) NOT NULL,
      PropertyLocation VARCHAR(45) NOT NULL,
      PropertyStatus  VARCHAR(45) NOT NULL,
      RentalPrice     DECIMAL NOT NULL,
      PRIMARY KEY (PropertyId, BuildingId, OwnerId),
      FOREIGN KEY (BuildingId) REFERENCES Building (BuildingId),
      FOREIGN KEY (OwnerId) REFERENCES Owner (OwnerId)
    )`, handleError);

    // Create table Client
    db.run(`CREATE TABLE IF NOT EXISTS Client(
      ClientID          INTEGER NOT NULL,
      ClientInformation VARCHAR(45) NOT NULL,
      ClientName        VARCHAR(45) NOT NULL,
      PRIMARY KEY (ClientID)
    )`, handleError);

    // Create table Lease
    db.run(`CREATE TABLE IF NOT EXISTS Lease(
      LeaseID         INTEGER NOT NULL,
      ClientID        INTEGER NOT NULL,
      PropertyId      INTEGER NOT NULL,
      BuildingId      INTEGER NOT NULL,
      OwnerId         INTEGER NOT NULL,
      LeaseExpDate    DATE NOT NULL,
      PRIMARY KEY (LeaseID, ClientID, PropertyId, BuildingId, OwnerId),
      FOREIGN KEY (ClientID) REFERENCES Client (ClientID),
      FOREIGN KEY (PropertyId, BuildingId, OwnerId) REFERENCES Property (PropertyId, BuildingId, OwnerId)
    )`, handleError);

    // Create table ServiceTransaction
    db.run(`CREATE TABLE IF NOT EXISTS ServiceTransaction(
      TransactionID       INTEGER NOT NULL,
      PropertyId          INTEGER NOT NULL,
      BuildingId          INTEGER NOT NULL,
      OwnerId             INTEGER NOT NULL,
      ServiceDescription  VARCHAR(45) NOT NULL,
      TransactionDate     DATE NOT NULL,
      ServicePrice        DECIMAL NOT NULL,
      PRIMARY KEY (TransactionID, PropertyId, BuildingId, OwnerId),
      FOREIGN KEY (PropertyId, BuildingId, OwnerId) REFERENCES Property (PropertyId, BuildingId, OwnerId)
    )`, handleError);


    db.run(`INSERT INTO Property (PropertyId, BuildingId, OwnerId,
      PropertyType, PropertyLocation, PropertyStatus, RentalPrice)
      VALUES (1, 1, 'Ricard', 'apartment', 'Geschwister-Scholl-Strasse',
      'habited', 320)`, handleError);

    db.run(`INSERT INTO Property (PropertyId, BuildingId, OwnerId,
      PropertyType, PropertyLocation, PropertyStatus, RentalPrice)
      VALUES (2, 1, 'Lucia', 'apartment', 'Geschwister-Scholl-Strasse',
      'habited', 320)`, handleError);

    db.run(`INSERT INTO Property (PropertyId, BuildingId, OwnerId,
      PropertyType, PropertyLocation, PropertyStatus, RentalPrice)
      VALUES (3, 1, 'Yusuf', 'apartment', 'Geschwister-Scholl-Strasse',
      'habited', 320)`, handleError);

  });
};

// Handle errors
const handleError = (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Created table successfully.');
  }
};

// Creation of the tables
createTables();

// Close connection to the Database
db.close((err) => {
  if (err) {
    console.error('Error closing connection:', err.message);
  } else {
    console.log('Closed connection to the Database.');
  }
});



//TABLES CREATION SQL:
/*

CREATE TABLE ServiceTransaction(
TransactionID       int NOT NULL,
PropertyId          int NOT NULL,
BuildingId          int NOT NULL,
OwnerId             int NOT NULL,
ServiceDescription  varchar(45) NOT NULL,
TransactionDate     date NOT NULL,
ServicePrice        decimal NOT NULL,
PRIMARY KEY (TransactionID, PropertyId, Building Id, OwnerId),
KEY FK_1 (PropertyId, BuildingId, OwnerId),
CONSTRAINT FK_6 FOREIGN KEY FK_1 (PropertyId, BuildingId, OwnerId) REFERENCES Property (PropertyId, BuildingId, OwnerId)
);


CREATE TABLE Lease(
LeaseID         int not null,
ClientID        int not null,
PropertyId      int not null,
BuildingId      int NOT NULL,
OwnerId         int NOT NULL,
LeaseExpDate    date NOT NULL,
PRIMARY KEY (LeaseID, ClientID, PropertyId, BuildingId, OwnerId),
KEY FK_1 (ClientID),
CONSTRAINT FK_3 FOREIGN KEY FK_1 (ClientID) REFERENCES Client (ClientID),
KEY FK_2 (PropertyId, BuildingId, OwnerId),
CONSTRAINT FK_5 FOREIGN KEY FK_2 (PropertyId, BuildingId, OwnerId) REFERENCES Property (PropertyId, BuildingId, OwnerId) 
);


CREATE TABLE Owner(
OwnerId             int NOT NULL,
OwnerInformation    varchar(45) NOT NULL,
OwnerName           varchar(45) NOT NULL,
PRIMARY KEY (OwnerId)
);


CREATE TABLE Property(
PropertyId      int NOT NULL
BuildingId      int NOT NULL,
OwnerId         int NOT NULL,
PropertyType    varchar(45) NOT NULL,
PropertyLocation varchar(45) NOT NULL,
PeropertyStatus varchar(45) NOT NULL
RentalPrice     decimal NOT NULL
PRIMARY KEY (PropertyId, BuildingId, OwnerId),
KEY FK_1 (BuildingId),
CONSTRAINT FK_1 FOREIGN KEY FK_1 (BuildingId) REFERENCES Building (BuildingId), KEY FK_2 (OwnerId),
CONSTRAINT FK_2 FOREIGN KEY FK_2 (OwnerId) REFERENCES Owner (OwnerId)
);


CREATE TABLE Client(
ClientID          int NOT NULL,
ClientInformation varchar(45) NOT NULL
ClientName        varchar(45) NOT NULL,
PRIMARY KEY (ClientID)
);


CREATE TABLE Building(
BuildingId        int NOT NULL,
BuildingType      varchar(45) NOT NULL,
BuildingLocation  varchar(45) NOT NULL
PRIMARY KEY (BuildingId)
);

*/
