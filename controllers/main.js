const router = require('express').Router();

const { Post, User } = require('../models');

// Endpoint: '/'
// Renders the main page
router.get('/', async (req, res) => {
    try {
        res.render('home', {
            loggedIn: req.session.loggedIn,
            home: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Endpoint: '/login'
// Renders the login page
router.get('/login', (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }

        res.render('login', {
            loggedIn: req.session.loggedIn,
            login: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Endpoint: '/dashboard'
// Renders the dashboard page
router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        user = await User.findByPk(req.session.userid, {
            attributes:{
                exclude: ['password', 'id']
            },
            include: [Post],
        });
        console.log(user.dataValues);
        res.render('dashboard', {
            data: user.dataValues,
            loggedIn: req.session.loggedIn,
            dashboard: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});


module.exports = router