const jwt = require('jsonwebtoken');
const config = require('./config');

const auth = (req, res, next) => {
    if(req.headers) {
        console.log(req.headers);
        if(req.headers.authorization) {
            const [bearer, token] = req.headers.authorization.split(" ");
            const decode = jwt.verify(token, config.privateKey);
            if(decode['username']) {
                req.username = decode['username'];
                next();
            }
        }
    }
    res.status(401).send('Unauthorised from middleware');
}
module.exports = {auth};