const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

const obj = [

];

app.get('/bookings', function(req, res) {
  res.send(obj);
});

app.post('/bookings', function(req, res) {
  if (obj.length < 5) {
    obj.push({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      reason: req.body.reason
    });
    res.send(obj);
  } else {
    res.send('Error');
  }
});

app.listen(3000, function() {
  console.log('Server running');
});