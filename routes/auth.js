var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {

    res.render("auth/login.ejs", {
        errors: req.flash('errors')
    })
});

router.post('/login', function(req, res, next){
    const errors = {}

    const {email, password} = req.body
    if(!email){
        errors.email = "Email is required!"
    }

    if(!password){
        errors.password = "Password is required"
    }

    if(errors != null){
        console.log(errors)
        req.flash("errors", errors)
        return res.redirect("/login")
    }

    return res.redirect("/users")
})

module.exports = router;
