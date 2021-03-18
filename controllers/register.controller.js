exports.register = (req, res) => {

    res.render('register')

};

exports.registerSaved = async (req, res) => {

    console.log(req.body.email);
    console.log(req.body.psw);

    res.send('This is placeholder text');

}