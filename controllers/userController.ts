import express = require('express');
import { User } from '../models/user.model';

const router = express.Router();

router.get('/', (req, res) => {
  User.find({}, (err:any, result:any) => {
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err: express.Errback, result: express.Response) => {
    res.send(result);
  });
});

router.delete('/:id', (req, res) =>{
  User.findByIdAndDelete(req.params.id, (err: express.Errback, result: express.Response) =>{
    res.send(result);
  });
});

router.post('/login', (req, res) =>{
  User.findOne({name: req.body.name, password: req.body.password}, (err:express.Errback, result:express.Response) =>{
    res.send(result);
  });
});

router.post('/register', (req, res) => {
  const user = new User();

  user.dateCreated = Date.now();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.imageUrl = req.body.imageUrl;
  user.latitude = req.body.latitude;
  user.longitude = req.body.longitude;
  user.selectedRadius = req.body.selectedRadius;

  user.save((err, result) => {
    if (err) {
      res.send('Cannnot save user: ' + err);
    } else {
      res.send(result);
    }
  });
});

router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err: unknown) => {
    if (err) {
      res.send('Cannnot update user: ' + err);
    } else {
      res.send('success');
    }
  });
});

export default router;
