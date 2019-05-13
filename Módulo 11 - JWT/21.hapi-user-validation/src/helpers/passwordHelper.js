const Bcrypt =  require('bcrypt');
const {
    promisify
} = require('util');

const SALT = 3;

class PasswordHelper {

    static hashPassword(pass) {
        return Bcrypt.hash(pass, SALT);
    }

    static comparePassword(pass, hash) {
        return Bcrypt.compare(pass, hash);
    }
}

module.exports = PasswordHelper;