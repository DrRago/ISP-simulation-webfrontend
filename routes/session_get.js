const auth = require('../util/auth');
const constants = require('../constants');

exports.login = (request, response) => {
    if (!constants.CONNECTION_SUCCESS) {
        return response.status(500).render("error/500")
    }
    if (auth.auth(request)) {
        return response.redirect("/stats")
    }
    response.render('login')
};

exports.register = (request, response) => {
    if (!constants.CONNECTION_SUCCESS) {
        return response.status(500).render("error/500")
    }
    if (auth.auth(request)) {
        return response.redirect("/stats")
    }
    response.render('register');
};

exports.logout = (request, response) => {
    // Destroy the session
    // No session = not logged in
    request.session.destroy();
    response.redirect("/")
};
