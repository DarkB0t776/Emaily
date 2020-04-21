// const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const axios = require('axios');
//
// module.exports = async ({ subject, recipients }, content) => {
//   try {
//     sgMail.setApiKey(keys.sendGridKey);
//     const formattedRecipients = recipients.map(({ email }) => email);
//     const msg = {
//       to: formattedRecipients,
//       from: 'no-reply@emaily.com',
//       subject,
//       html: content,
//     };
//     await sgMail.send(msg);
//   } catch (e) {
//     throw new Error(e);
//   }
// };


module.exports = async ({subject, recipients}, content) => {
  try {
    const msg = {
      sender: {email: 'no-reply@emaily.com'},
      to: recipients,
      htmlContent: content,
      subject
    };
    const response = await axios.post('https://api.sendinblue.com/v3/smtp/email',msg, {
      headers: {'api-key': keys.sendInBlueKey},
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
