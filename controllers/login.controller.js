exports.login = (req, res) => {
    res.redirect('/')
};

exports.loginPage = (req, res) => {
    res.render('login', { user: req.user });
}