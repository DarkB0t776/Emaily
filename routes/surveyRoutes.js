const { Router } = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = Router();

const Survey = mongoose.model('Survey');

router.get('/api/surveys/thanks', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  try {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((item) => ({ email: item.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    await mailer(survey, surveyTemplate(survey));
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (e) {
    res.status(422).send(e);
  }
});

module.exports = router;
