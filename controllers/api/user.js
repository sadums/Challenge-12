const router = require('express').Router();

const { User } = require('../../models');

// Create a new user with signup
// ENDPOINT: "/api/user/signup"
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userid = newUser.dataValues.id
            res.status(200).json(newUser);
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// login a user
// ENDPOINT: "/api/user/login"
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!user) {
            res.status(400).json({ message: 'Username not found!' });
            return;
        }

        const password = await user.checkPassword(req.body.password);

        if (!password) {
            res.status(400).json({ message: 'Incorrect username or password.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userid = user.dataValues.id
            res.status(200).json({ user: user, message: "Log in successful" });
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Logout a user
// ENDPOINT: "/api/user/logout"
router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(200).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

module.exports = router;