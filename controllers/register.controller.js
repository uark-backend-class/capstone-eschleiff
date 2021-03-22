const User = require('../models/users.model');

exports.register = (req, res) => {
    
   

    res.render('register')

};

exports.addUser = async (req, res) => {

    if (req.body.firstName && req.body.lastName) {
        let user = await User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName });
        if (user) {
            console.log('This user already exists');
            res.render('register', { user });
        }
    }
    else {
        const user = new User(req.body);
        await user.save(); 
        res.redirect('/');
    }


}