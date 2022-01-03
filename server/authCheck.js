const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.JWT_SECRET;

const withAuth = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.body.userName = decoded.userName;
                next();
            }
        });
    }
};

module.exports = withAuth;