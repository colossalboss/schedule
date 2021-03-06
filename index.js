const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

const obj = [

];

app.get('/bookings', function(req, res) {
  if (obj.length > 0) {
    res.send(obj);
  } else {
    res.send('<i class="fa fa-frown-o fa-5x" style="color:orange"></i>');
  }
});

app.post('/bookings', function(req, res) {
  if (obj.length < 5) {

    let checks = obj.find(item => item.name === req.body.name);
    if (checks === undefined) {

      obj.push({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        reason: req.body.reason
      });
      res.send(obj);
    } else {
      res.send('Name already registered');
    }
  } else {
    res.send('Error');
  }
});

app.listen(3000, function() {
  console.log('Server running');
});