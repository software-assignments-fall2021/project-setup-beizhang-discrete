const User = require('../schemae/User').User;

const doesUserExist = (username) => {
    const query = User.findOne({username: username});
    if (query) {
        return true;
    }
    else {
        return false;
    }

}

module.exports = doesUserExist