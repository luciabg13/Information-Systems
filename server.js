// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
var multer = require('multer');
var upload = multer();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { importData, getDatas, filterData } = require('./services/services');
const {getDatap } = require('./services/properties');

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.json());

app.use(cors());

app.post('/setServices', importData);
app.get('/getServices', getDatas);
app.get('/getProperties', getDatap);
app.get('/filterServices', filterData);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});


