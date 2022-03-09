const User = require('../models/user.model');

function GetUser(userId) {
  return new Promise(async (resolve, reject) => {
    resolve(await User.findById(userId));
  });
}

exports.GetUser = GetUser;
