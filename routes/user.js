const {
    Router
} = require('express')
const router = Router()
const control = require('../controllers/user')

// GET

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/signup', (req, res) => {
    res.render('user/signup')
})

// POST

router.post('/login', async (req, res) => {

    let {
        email,
        password
    } = req.body

    console.log(email, password)

    if (!email || !password) {
        req.flash('error_msg', 'Falta usuario o contraseña');
        res.redirect('/users/login')
    } else {
        let user = await usersController.checkLogin(email, password);

        if (user) {
            req.session.email = user.email;
            req.session.name = user.name;
            req.session.userId = user.id;
            req.session.logginDate = new Date();
            res.redirect('/');
        } else {
            req.flash('error_msg', 'Usuario o contraseña inválido');
            res.redirect('/users/login');
        }
    }
});

router.post('/signup', async (req, res) => {
    let {
        name,
        email,
        password
    } = req.body;

    let checkRegister = await control.signUpProccess(name, email, password);

    if (checkRegister) {
        req.flash('success_msg', 'Registrado! Te damos la bienvenida al sistema.')
        res.redirect('/user/login')
    } else {
        req.flash('error_msg', 'No se pudo registrar');
        res.redirect('/user/signup');
    }
})

module.exports = router