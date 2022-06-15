const User = require("../models/User");

exports.list_all_users = (req, res) => {
  // List all users for admin
  if ((req.user.username = "admin")) {
    User.find({}, { password: 0, date: 0 }, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  } else {
    return res.status(401).json({ error: "Access denied." });
  }
};
