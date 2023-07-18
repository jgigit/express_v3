// var crudModel = require('../models/crud-model');
var schemas = require('../models/schemas.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

module.exports = {
    getAll: function(req, res) {
        // res.render('index', { title: 'CRUD Controller' });
        res.send('CRUD Controller');
    },
    crudForm: function(req, res) {
        res.render('crud-operation');
    },
    editCrud: function(req, res) {
        const editId = req.params.id;
        const editData = crudModel.editCrud(editId);
        res.render('crud-operation', { editData: editData, editId: editId });
    },
    createCrud: async function(req, res) {
        let name = req.body.name;
        let email = req.body.email;
        let mobile_no = req.body.mobile_no;
        let password = bcrypt.hashSync(req.body.password, 8);

        let customers = schemas.customers;

        let qry = { email: email };
        let searchRes = await customers.findOne(qry).then(async(userData) => {
            if (!userData) {
                let newCust = new schemas.customers({
                    name: name,
                    email: email,
                    mobile_no: mobile_no,
                    password: password
                });
                let saveCust = await newCust.save();
                // return 'Data inserted';
                res.status(200).json({ success: true, message: 'Data inserted' });
            } else {
                console.log(userData);
                // return 'Duplicate email id';
                res.status(204).send({ success: false, errors: 'Duplicate email id' });
            }
        });
        // res.status(200).json({ success: true, message: searchRes });

        // console.log(req.body);        
        // const createData = crudModel.createCrud(req.body);
        // console.log(createData);
        // res.status(200).json({ message: createData });
        // res.send('<h1>' + createData + '</h1>');
    },
    // createCrud: async function(req, res) {
    //     // console.log(req.body);
    //     let customersTable = crudModel.customersTable;
    //     let qry = { email: req.body.email }
    //     let result = await customersTable.findOne(qry).then((userData) => {
    //         res.status(200).json({ message: userData });
    //     });
    //     console.log(req);
    //     res.status(200).json({ message: req.body});
    //     // res.send('<h1>' + createData + '</h1>');
    // },
    fetchCrud: async function(req, res) {
        let customers = schemas.customers;
        //let result = await customers.find().exec();
        // res.send(result);
        await customers.find({}).then((data) => {
            if (data) {
                res.status(200).json({ success: true, data: data });
            } else {
                res.status(500).json({ success: true, data: 'No record found' });
            }
        });
        // const promise = crudModel.fetchCrud();
        // promise.then(function(jedis) {
        //     res.send(jedis);
        // });
        // res.send('<h1>' + fetchData + '</h1>');
    },
    UpdateCrud: function(req, res) {
        const updateId = req.params.id;
        const updateData = crudModel.UpdateCrud(updateId);
        res.send('<h1>' + updateData + '</h1>');
    },
    deleteCrud: function(req, res) {
        const deleteId = req.params.id;
        const deleteData = crudModel.deleteCrud(deleteId);
        res.send('<h1>' + deleteData + '</h1>');
    },

    loginCrud: function(req, res) {
        var customer = schemas.customers;
        customer.findOne({ email: req.body.email }).exec((err, cust) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!cust) {
                return res.status(404).send({ message: "User Not found." });
            }
            //comparing passwords
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                cust.password
            );

            // checking if password was valid and send response accordingly
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            //signing token with user id
            var token = jwt.sign({
                id: cust.id
            }, process.env.API_SECRET, {
                expiresIn: 86400
            });

            res.status(200).send({
                user: {
                    id: cust._id,
                    email: cust.email,
                    fullName: cust.name,
                },
                message: "Login successfull",
                accessToken: token,
            });
        });
    }

}