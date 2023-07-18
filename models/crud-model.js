// const MongoClient = require('mongodb').MongoClient;
const res = require("express/lib/response");
const mongoose = require("mongoose");
var db = require("../database");
var customersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile_no: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    status: { type: Boolean },
});
// var customersSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     mobile_no: String,
//     password: String,
//     age: Number,
//     status: Boolean,
// });
customersTable = mongoose.model('customers', customersSchema);

module.exports = {
    createCrud: function(cust) {
        return customersTable.findOne({ email: cust.email }, (err, userWithSameEmail) => {
            if (err) {
                res.status(400).json({
                    message: 'Error getting email try gain',
                });
            } else if (userWithSameEmail) {
                // console.log(cust);
                return { message: 'This email is taken' };
                // await res.status(400).json({ message: 'This email is taken' });
                // next();
            } else {
                var cus = new customersTable(cust);
                cus.save().then((user) => { res.json(user); })
                    .catch((err) => {
                        res.status(400).json({
                            message: 'Error registering',
                            err,
                        });
                    });
            }
        });
        // return 'This email is taken 1';
        // var cus = new customersTable({
        //     name: 'test',
        //     email: 'a@gmail.com',
        //     mobile_no: '9876543210',
        //     password: '123456',
        //     age: 19,
        //     status: 1
        // });
        // save model to database
        // cus.save().then(data => {
        //     return "User created successfully!!";
        // }).catch(err => {
        //     return "Some error occurred while creating user";
        // });
        // data = "Form data was inserted";
        // return data;
    },
    fetchCrud: function() {
        var promise = customersTable.find().exec();
        // console.log(promise);
        return promise;
    },
    editCrud: function(editData) {
        data = "Data is edited by id: " + editData;
        return data;
    },
    UpdateCrud: function(updateId) {
        data = "Data was updated by id: " + updateId;
        return data;
    },
    deleteCrud: function(deleteId) {
        data = "Data was deleted by id: " + deleteId;
        return data;
    }
}