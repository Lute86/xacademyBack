const nodemailer = require('nodemailer');

const transporter = {
  sendMail: (mailOptions, callback) => {
    callback(null, { message: 'Email sent successfully' });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { from, email, reason, description } = req.body;

    const mailOptions = {
      from: from,
      to: email,
      subject: reason,
      text: description
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send('Error sending email: ' + error.message);
      } else {
        res.status(200).send('Email sent successfully');
      }
    });
  } catch (error) {
    res.status(500).send('Error sending email: ' + error.message);
  }
};

module.exports = {
  sendEmail
};
