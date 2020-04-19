const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

module.exports = async ({ subject, recipients }, content) => {
  try {
    sgMail.setApiKey(keys.sendGridKey);
    const formattedRecipients = recipients.map(({ email }) => email);
    const msg = {
      to: formattedRecipients,
      from: 'no-reply@emaily.com',
      subject,
      html: content,
    };
    await sgMail.send(msg);
  } catch (e) {
    throw new Error(e);
  }
};
