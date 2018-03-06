const auth = require("../util/auth");
const constants = require("../constants");

exports.view = (request, response) => {
    if (!constants.CONNECTION_SUCCESS) {
        return response.status(500).render("error/500")
    }
    if (auth.auth(request)) {
        let username = request.session.user[0].username;
        constants.CONNECTIONS.RADIUS.query("SELECT `username`,`nasporttype`,`acctstarttime`,`acctsessiontime`,`servicetype`,`acctterminatecause` FROM `radacct` WHERE `username`='" + username + "' ORDER BY `radacct`.`acctstarttime` DESC", (error, data) => {
            if (error) {
                console.log(error);
                return response.status(500).render("error/500")
            }
            return response.status(200).render("profile", {
                username: username,
                data: data
            })
        });
    } else {
        return response.status(401).render("error/401")
    }
};
