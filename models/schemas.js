var mongoose = require('mongoose');
var schema = mongoose.Schema;
var custTable = new schema({
    name: { type: String, trim: true, required: true },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    mobile_no: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    age: { type: Number, trim: true, min: 18, max: 65 },
    status: { type: Boolean },
});
let customers = mongoose.model('customers', custTable, 'customers');
module.exports = { customers };