const { Router } = require('express');
const Feedback = require('../models/Feedback');
const { check, validationResult } = require('express-validator');
const router = Router();

router.post(
  '/add',
  [
    check('author', 'Author is required').exists(),
    check('message', 'Minimum message length is 6 letters')
    .isLength({ min: 6 }),
  ],
  async (req, res) => {
  try {
    console.log('request body', req.body)
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'incorrect data when sending feedback',
      });
    }

    const { author, message } = req.body;
    const feedback = new Feedback({ author, message });

    await feedback.save();

    res.status(201).json({
      message: 'Message was added to guestbook',
      feedback: {
        author: feedback.author,
        message: feedback.message,
        _id: feedback.id,
        created_at: feedback.created_at,
      },
  })

  } catch (error) {
    console.log('error>>>>>>',error)
    res.status(500).json({ message: 'Something go wrong try again' });
  }
});

router.get('/getAll' , async (req , res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ created_at: -1 });
    res.json({ feedbacks, message: 'Now U see all feedbacks' });
  } catch (error) {
    res.status(500).json({ message: 'Something go wrong try to refresh' });
  }
});

module.exports = router;