const Joi = require("@hapi/joi");

/* 
Username should contain 3-30 characters, letters, numbers, underscore, and dash only.
Reference: https://regexpattern.com/username/

Password should contain 6-128 characters, at least 1 upper case English letter, 1 lower case English letter, and 1 special character.
Reference: https://regexpattern.com/strong-password/
*/

const accountValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().regex(/^[a-zA-Z0-9_-]{3,30}$/).min(3).max(30).required(),
    password: Joi.string().regex(/^\S*(?=\S{6,128})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/).min(6).max(128).required(),
  });
  return schema.validate(data);
};

const taskValidation = (data) => {
  const schema = Joi.object({
    date: Joi.date().required(),
    type: Joi.string().min(1).max(128).required(),
    minute: Joi.number().min(0).max(1440).required(),
    second: Joi.number().min(0).max(60).required(),
    count: Joi.number().min(1).max(1000).required(),
    userid: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { accountValidation, taskValidation, };