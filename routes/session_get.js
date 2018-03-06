exports.login = (request, response) => {
  response.render('login');
};

exports.register = (request, response) => {
    response.render('register');
};

exports.logout = (request, response) => {
  // Destroy the session
  // No session = not logged in
  request.session.destroy(() => {
    // Return 200 OK
    return response.status(200).send();
  });
};
