const md5 = require('md5');
const constants = require('../constants.js');

exports.login = (request, response) => {
  // Get the provided username
  const username = request.body.username;
  // Get the provided password
  const password = request.body.password;
  // Get MD5 Hashed Password
  const password_md5 = md5(password);

  constants.CONNECTION.query("SELECT * FROM radcheck WHERE username=" + username + " AND value=" + password_md5 + ";", (error, result) => {
    if (error) throw error;
    console.log("Result: " + result);
  });
};

exports.register = (request, response) => {

};
