var User = require('../models/schemas.js');

exports.getuser = (req, res) => {
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT token"
            });
    } else if (req.user == "admin") {
        res.status(200)
            .send({
                message: "Congratulations! but there is no hidden content"
            });
    } else {
        res.status(403)
            .send({
                message: req.user
            });
    }
};