const router = require('express').Router();

const { Comment, Post, User } = require('../../models');

// Get a post by id
// ENDPOINT: "/api/post/:id"
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!post) {
            res.status(404).json({ message: 'post not found' });
            return;
        }
        res.status(200).json(post);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create a new post
// ENDPOINT: "/api/post/create"
router.post('/create', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.status(400).json({ message: 'please login to create a post.' });
            return;
        }

        if (!req.body.content || !req.body.title) {
            res.status(400).json({ message: "req.body is incomplete." });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(404).json({ message: 'Unable to find user in the database.' });
            return;
        }

        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: user.dataValues.username,
            author_id: req.session.userid
        });

        if (!post) {
            res.status(500).json({ message: "failed to create post" });
            return;
        }

        res.status(200).json(post);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Update a post
// ENDPOINT: "/api/post/update/:id"
router.put('/update/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.status(400).json({ message: 'please login to update a post.' });
            return;
        }

        if (!req.body.content || !req.body.title) {
            res.status(400).json({ message: "req.body is incomplete." });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(404).json({ message: 'Unable to find user in the database.' });
            return;
        }

        const post = await Post.findOne({
            where: {
                id: req.params.id,
                author_id: user.dataValues.id
            }
        });

        if (!post) {
            res.status(404).json({ message: "failed to find post" });
            return;
        }

        post.set({
            title: req.body.title,
            content: req.body.content
        });

        await post.save();

        res.status(200).json(post);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Delete a post
// ENDPOINT: "/api/post/delete/:id"
router.delete('/delete/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.status(400).json({ message: 'please login to delete a post.' });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(404).json({ message: 'Unable to find user in the database.' });
            return;
        }

        const post = await Post.findOne({
            where: {
                id: req.params.id,
                author_id: req.session.userid
            }
        });

        if (!post) {
            res.status(404).json({ message: "Could not find post to delete" });
            return;
        }

        await post.destroy()

        res.status(200).json({ message: 'post deleted' });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create a new comment on a post
// ENDPOINT: "/api/post/comment"
router.post('/comment', async(req, res) => {
    try{
        if(!req.body.content || !req.body.postid){
            res.status(400).json({ message: 'req.body is not complete!'});
            return;
        }

        if (!req.session.loggedIn) {
            res.status(400).json({ message: 'please login to write a comment.' });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(404).json({ message: 'Unable to find user in the database.' });
            return;
        }

        const post = await Post.findByPk(req.body.postid);

        if(!post){
            res.status(404).json({message: 'unable to find post'});
            return;
        }

        const comment = await Comment.create({
            content: req.body.content,
            author: user.dataValues.username,
            post_id: req.body.postid
        });

        res.status(200).json(comment);
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

// Get all comments for one post
// ENDPOINT: "/api/post/comments/:id"
router.get('/comments/:id', async(req, res) => {
    try{
        const post = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: Comment
        });

        if (!post) {
            res.status(404).json({ message: "failed to find post" });
            return;
        }

        res.status(200).json(post.comments);
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});


module.exports = router;