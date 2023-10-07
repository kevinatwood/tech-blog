const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/',  async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });
    const postData = await Post.findAll();

    const users = userData.map((project) => project.get({ plain: true }));
    const posts = postData.map((post) => post.get({ plain: true}))

    res.render('homepage', {
      users,
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  // If a session exists, redirect the request to the homepage
  try{
    const postData = await Post.findAll({where: {user_id: req.session.user_id}});

  const posts = postData.map((post) => post.get({ plain: true}))

  res.render('dashboard', {
    posts,
    // Pass the logged in flag to the template
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/post/:id', withAuth, async (req, res) => {
  // If a session exists, redirect the request to the homepage
  try{
    const postData = await Post.findOne({where: {id: req.params.id}});

  const post = postData.get({ plain: true})

  res.render('post', {
    post,
    // Pass the logged in flag to the template
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
