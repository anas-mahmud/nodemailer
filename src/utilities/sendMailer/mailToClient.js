const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMailToClient = async (req, res) => {
  const clientEmail = req.body.email;
  const domain = req.body.domain;
  const name = req.body.name;

  const config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_APP,
      pass: process.env.GMAIL_APP_PASS,
    },
  };

  const transporter = await nodemailer.createTransport(config);

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Web Tech Solution",
      link: "https://web-Tech-Solution.com/",
    },
  });

  const email = {
    body: {
      name: name,
      intro: "You have received your project successfully",
      action: {
        instructions: "To check your project, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Website Link -->",
          link: domain,
        },
      },
      outro: "We appreciate working with you",
    },
  };

  const mail = mailGenerator.generate(email);

  const mailInfo = {
    from: "anasibnali523@gmail.com",
    to: clientEmail,
    subject: "Project Has Submitted.",
    html: mail,
  };

  transporter
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

module.exports = sendMailToClient;
