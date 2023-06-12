const router = require('express').Router();

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
// Renders the main page
router.get('/dashboard', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render('/dashboard', {
                loggedIn: req.session.loggedIn,
                dashboard: true
            });
            return;
        }

        res.redirect('/login');
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});


module.exports = router