const auth = (req) => {
    return req.session.user
}

module.exports = {
    auth: auth
}