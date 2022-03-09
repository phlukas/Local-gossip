const User = require('../models/user.model');

function GetUser(userId) {
  return User.findById(userId, (err, res) => {
    return res;
  });
}

exports.GetUser = GetUser;
