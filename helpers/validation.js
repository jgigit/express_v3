const { check, validationResult } = require('express-validator')
var schemas = require('../models/schemas.js');
let customers = schemas.customers;

const userValidationRules = () => {
    return [
        check('name', 'Name is requied').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail().custom(value => {
            return customers.findOne({ email: value })
                .then((res) => {
                    if (res) {
                        return Promise.reject('Email already taken');
                    }
                    return true;
                })
        }),
        check('mobile_no', 'Name is requied').isLength({ min: 10 }).withMessage('Mobile number must be 10 characters').isLength({ max: 12 }).withMessage('Mobile number maximum 12 characters'),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         success: false,
    //         errors: errors.array()
    //     });
    // }

    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.param]: err.msg
    }))

    // var extractedError = Object.values(extractedErrors).flat()
    // var extractedError = errors.array().map(err => (
    //     extractedError[err.param] = err.msg
    // ))

    return res.status(400).json({
        success: false,
        errors: extractedErrors,
    })

    // return res.status(400).json({
    //     errors: errors,
    // })
}

module.exports = {
    userValidationRules,
    validate,
}