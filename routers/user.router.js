const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', (req, res) => {
  User.find({}, (err, result) => {
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.query.id, (err, result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  var user = new User();

  user.dateCreated = Date.now();
  console.log(req.body);
  user.name = req.body.name;
  user.email = req.body.email;
  user.Password = req.body.Password;
  user.ImageUrl = req.body.ImageUrl;
  user.Rank = req.body.Rank;
  user.Latitude = req.body.Latitude;
  user.Longitude = req.body.Longitude;
  user.selectedRadius = req.body.selectedRadius;
  user.showLocation = req.body.showLocation;
  user.showProfile = req.body.showProfile;

  user.save((err, result) => {
    if (err) {
      res.send('Cannnot save user: ' + err);
    } else {
      res.send(result);
    }
  });
});

router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      res.send('Cannnot update user: ' + err);
    } else {
      res.send('success');
    }
  });
});

module.exports = router;
