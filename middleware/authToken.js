const jwt = require("jsonwebtoken");
var schemas = require('../models/schemas.js');

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        let customers = schemas.customers;
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function(err, decode) {
            if (!decode) {
                req.user = undefined;
                next();
            } else {
                // console.log(err);
                if (err) req.user = undefined;
                customers.findOne({
                        _id: decode.id
                    })
                    .exec((err, user) => {
                        if (err) {
                            req.user = undefined;
                            next();
                            // res.status(500)
                            //     .send({
                            //         message: err
                            //     });
                        } else {
                            req.user = user;
                            next();
                        }
                    })
            }
        });
    } else {
        req.user = undefined;
        next();
    }
};
module.exports = verifyToken;