const nodemailer = require("nodemailer");
class clientMail {
  constructor(clientEmail, domain) {
    this.clientEmail = clientEmail;
    this.domain = domain;
  }
}

class devMail {
  constructor(sender, receiver, subject, message) {
    this.sender = sender;
    this.receiver = receiver;
    this.subject = subject;
    this.message = message;
  }
}

const sendMail_ = async (mailInfo) => {
  const config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_APP,
      pass: process.env.GMAIL_APP_PASS,
    },
  };
  const transporter = nodemailer.createTransport(config);
  return transporter
    .sendMail(mailInfo)
    .then(() => {
      return res.status(200).json({
        message: "mail has been sent",
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
};

const sendClientMail = async (clientMailInstance) => {
  const mailInfo = {
    from: "anasibnali523@gmail.com",
    to: clientMailInstance.clientEmail,
    subject: "Project Has Submitted.",
    text: clientMailInstance.domain,
  };
  return sendMail_(mailInfo);
};

const sendDevMail = async (devMailInstance) => {
  const mailInfo = {
    from: devMailInstance.sender,
    to: devMailInstance.receiver,
    subject: devMailInstance.subject,
    text: devMailInstance.message,
  };
  return sendMail_(mailInfo);
};

const sendMailer = async (req, res) => {
  const mailBody = req.body;

  const clientMailInstance = new clientMail(
    mailBody.clientEmail,
    mailBody.domain
  );
  const devMailInstance = new devMail(
    mailBody.sender,
    mailBody.receiver,
    mailBody.subject,
    mailBody.message
  );

  console.log(clientMailInstance);
  console.log(devMailInstance);
  console.log("hit");

  try {
    if (clientMailInstance instanceof clientMail) {
      console.log(`from inside of clientMail ${clientMailInstance}`);
      await sendClientMail(clientMailInstance);
    } else if (devMailInstance instanceof devMail) {
      console.log(`from inside of devMail ${devMailInstance}`);
      await sendDevMail(devMailInstance);
    } else {
      throw new Error("Invalid type");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = sendMailer;
