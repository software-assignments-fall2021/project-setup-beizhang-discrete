const User = require('../schemae/User').User;

export const doesUserExist = (username) => {
    const query = User.findOne({username: username});
    if (query) {
        return true;
    }
    else {
        return false;
    }

}