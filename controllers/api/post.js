const router = require('express').Router();

const { Post, User } = require('../../models');

// Create a new post
// ENDPOINT: "/api/post/create"
router.post('/create', async(req, res) => {
    try{
        if(!req.session.loggedIn){
            res.status(400).json({message: 'please login to create a post.'});
            return;
        }

        if(!req.body.content || !req.body.title ){
            res.status(400).json({ message: "req.body is incomplete." });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if(!user){
            res.status(404).json({ message: 'Unable to find user in the database.' });
            return;
        }

        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: user.dataValues.username,
            author_id: req.session.userid
        });

        if(!post){
            res.status(500).json({ message: "failed to create post" });
            return;
        }

        res.status(200).json(post);
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});


module.exports = router;