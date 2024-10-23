const express = require('express');
const router = express.Router();

const blogRouter = require('./routes/Blog');
const postRouter = require('./routes/Post');
const categoryRouter = require('./routes/Category');
const userRouter = require('./routes/User');
const profileRouter = require('./routes/Profile');

router.use('/blog', blogRouter);
router.use('/post', postRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/profile', profileRouter);

module.exports = router;
