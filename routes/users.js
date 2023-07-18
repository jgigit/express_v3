var express = require('express');
var userController = require('../controllers/user-controller');
var router = express.Router();
var verifyToken = require('../middleware/authToken');

module.exports = router;

// router.get("/", verifyToken, function(req, res) {
//     if (!req.user) {
//         res.status(403)
//             .send({
//                 message: "Invalid JWT token"
//             });
//     }
//     if (req.user == "admin") {
//         res.status(200)
//             .send({
//                 message: "Congratulations! but there is no hidden content"
//             });
//     } else {
//         res.status(403)
//             .send({
//                 message: req.user
//             });
//     }
// });

router.get('/', verifyToken, userController.getuser);

module.exports = router;