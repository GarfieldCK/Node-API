const User = require('../models/user');

module.exports = (req, res) => {
    User.create(req.body).then(() => {
        console.log("User register successfully")
        res.redirect('/');

    }).catch((error) => {
        console.log(error.errors)
        if (error) {
            const validationError = Object.keys(error.errors).map((key) => error.errors[key].message)
            req.flash('validationErrors', validationError);
            req.flash('data', req.body)
            return res.redirect('/register')
        }
    })
}