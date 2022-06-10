const Type = require("../models/Type");
// validation
const { typeValidation } = require("../validation");

exports.list_all_types = (req, res) => {
  // Find types with userid that matches with id in the token header
  Type.find({ userid: req.user.id }, (err, type) => {
    if (err) res.send(err);
    res.json(type);
  });
};

exports.create_a_type = (req, res) => {
  // Add userid to database
  newType = {
    ...req.body,
    userid: req.user.id,
  };

  // validate type
  const { error } = typeValidation(newType);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let new_type = new Type(newType);
  new_type.save((err, type) => {
    if (err) res.send(err);
    res.json(type);
  });
};

exports.delete_a_type = (req, res) => {
  Type.deleteOne(
    {
      type: req.body.type,
      userid: req.user.id,
    },
    (err, type) => {
      if (err) res.send(err);
      res.json({ message: "Type successfully deleted" });
    }
  );
};
