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
CONSTRAINT FK_6 FOREIGN KEY FK_1 (PropertyId, BuildingId, OwnerId) REFERENCES Property (PropertyId, BuildingId, OwnerId));


CREATE TABLE Lease(
LeaseID         int NOT NULL,
ClientID        int NOT NULL,
PropertyId      int NOT NULL,
BuildingId      int NOT NULL,
OwnerId         int NOT NULL,
LeaseExpDate    date NOT NULL,

PRIMARY KEY (LeaseID, ClientID, PropertyId, BuildingId, OwnerId),
KEY FK_1 (ClientID),
CONSTRAINT FK_3 FOREIGN KEY FK_1 (ClientID) REFERENCES Client (ClientID),
KEY FK_2 (PropertyId, BuildingId, OwnerId),
CONSTRAINT FK_5 FOREIGN KEY FK_2 (PropertyId, BuildingId, OwnerId) REFERENCES Property (PropertyId, BuildingId, OwnerId));


CREATE TABLE Owner(
OwnerId             int NOT NULL,
OwnerInformation    varchar(45) NOT NULL,
OwnerName           varchar(45) NOT NULL,

PRIMARY KEY (OwnerId)
);


CREATE TABLE Property(
PropertyId      int NOT NULL,
BuildingId      int NOT NULL,
OwnerId         int NOT NULL,
PropertyType    varchar(45) NOT NULL,
PropertyLocation varchar(45) NOT NULL,
PeropertyStatus varchar(45) NOT NULL,
RentalPrice     decimal NOT NULL,

PRIMARY KEY (PropertyId, BuildingId, OwnerId),
KEY FK_1 (BuildingId),
CONSTRAINT FK_1 FOREIGN KEY FK_1 (BuildingId) REFERENCES Building (BuildingId), KEY FK_2 (OwnerId),
CONSTRAINT FK_2 FOREIGN KEY FK_2 (OwnerId) REFERENCES Owner (OwnerId)
);


CREATE TABLE Client(
ClientID          int NOT NULL,
ClientInformation varchar(45) NOT NULL,
ClientName        varchar(45) NOT NULL,

PRIMARY KEY (ClientID)
);


CREATE TABLE Building(
BuildingId        int NOT NULL,
BuildingType      varchar(45) NOT NULL,
BuildingLocation  varchar(45) NOT NULL,

PRIMARY KEY (BuildingId)
);

