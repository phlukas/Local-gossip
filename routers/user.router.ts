import express = require('express');
const router = express.Router();
import { User } from '../models/user.model';

router.get('/', (req: any, res: any) => {
  User.find({}, (err: any, result: any) => {
    res.send(result);
  });
});

router.get('/:id', (req: any, res: any) => {
  User.findById(req.params.id, (err: any, result: any) => {
    res.send(result);
  });
});

router.post('/', (req: any, res: any) => {
  const user = new User();

  user.dateCreated = Date.now();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.imageUrl = req.body.imageUrl;
  user.rank = req.body.rank;
  user.latitude = req.body.latitude;
  user.longitude = req.body.longitude;
  user.selectedRadius = req.body.selectedRadius;
  user.showLocation = req.body.showLocation;
  user.showProfile = req.body.showProfile;

  user.save((err: any, result: any) => {
    if (err) {
      res.send('Cannnot save user: ' + err);
    } else {
      res.send(result);
    }
  });
});

router.patch('/:id', (req: any, res: any) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err: any) => {
    if (err) {
      res.send('Cannnot update user: ' + err);
    } else {
      res.send('success');
    }
  });
});

module.exports = router;
