var express = require('express');
var crudController = require('../controllers/crud-controller');
var router = express.Router();
// const { signupValidation, loginValidation } = require('../helpers/validation.js');
const { userValidationRules, validate } = require('../helpers/validation.js');
// const { check, validationResult } = require('express-validator')

// curd form route
router.get('/', crudController.getAll);

// curd form route
router.get('/form', crudController.crudForm);
// create data route
router.post('/create', userValidationRules(), validate, crudController.createCrud);
// display data route
router.get('/fetch', crudController.fetchCrud);
// edit data route
router.get('/edit/:id', crudController.editCrud);
// update data route
router.post('/edit/:id', crudController.UpdateCrud);
// delete data route
router.get('/delete/:id', crudController.deleteCrud);

router.post('/login', crudController.loginCrud);

// create data route
// router.post('/create', [
//         // username must be an email
//         check('username').isEmail(),
//         // password must be at least 5 chars long
//         check('password').isLength({ min: 5 }),
//     ],
//     (req, res) => {
//         // Finds the validation errors in this request and wraps them in an object with handy functions
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() })
//         }
//         crudController.createCrud
//     });

module.exports = router;