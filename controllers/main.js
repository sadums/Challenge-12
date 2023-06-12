const router = require('express').Router();


// Endpoint: '/'
// Renders the main page
router.get('/', async (req, res) => {
    try {
        res.render('home');
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
            login: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});



module.exports = router