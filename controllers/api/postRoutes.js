const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.params.id)
   const commentData = await Comment.destroy({ where: {post_id: req.params.id}})
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
    console.error(err)
  }
});


router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    const PostData = await Post.update(
      {
        title: req.body.title,
        body: req.body.body
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!PostData[0]) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});


module.exports = router;
