const md5 = require('md5');
const constants = require('../constants.js');
const auth = require('../util/auth');

exports.login = (request, response) => {
    // Get the provided username
    const username = request.body.username;
    // Get the provided password
    const password = request.body.password;
    // Get MD5 Hashed Password
    const password_md5 = md5(password);
    constants.CONNECTIONS.RADIUS.query("SELECT * FROM radcheck WHERE username='" + username + "' AND value='" + password_md5 + "';", (error, user) => {
        if (error) {
            console.log(error);
            return response.status(500).render("error/500")
        }
        if (Object.keys(user).length === 0) {
            console.log(username + " authentication failed");
            return response.status(403).render("error/403")
        }
        console.log(username + " logged in");
        request.session.user = user;
        return response.redirect("/profile")
    });
};

exports.register = (request, response) => {
    if (auth.auth(request)) {
        return response.redirect("/profile")
    }
    // Get the provided username
    const username = request.body.username;
    // Get the provided password
    const password = request.body.password;
    // Get MD5 Hashed Password
    const password_md5 = md5(password);

    constants.CONNECTIONS.RADIUS.query("INSERT INTO `radcheck`(`username`, `attribute`, `op`, `value`) VALUES ('" + username + "','MD5-Password',':=','" + password_md5 + "')", (error, result) => {
        if (error) {
            console.log(error)
            return response.status(500).render("error/500")
        }
    })
};
