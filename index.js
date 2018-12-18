const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

const obj = [
  {
    name: 'Godstar',
    email: 'stgodstar@gmail.com',
    address: 'Bayelsa'
  },
  {
    name: 'Gerrald',
    email: 'sengodstar@gmail.com',
    address: 'Lagos'
  }
];

app.get('/bookings', function(req, res) {
  res.send(obj);
});

app.post('/bookings', function(req, res) {
  obj.push({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  });
  res.send(obj);
});

app.listen(3000, function() {
  console.log('Server running');
});