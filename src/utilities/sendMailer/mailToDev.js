// const path = require("path");
const nodemailer = require("nodemailer");
// const hbs = require("nodemailer-express-handlebars");

const sendMailToDev = async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const receiverName = req.body.receiverName;
  const subject = req.body.subject;
  const message = req.body.message;
  // console.log(req.body);

  const config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_APP,
      pass: process.env.GMAIL_APP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  // const handlebarOptions = {
  //   viewEngine: {
  //     extName: ".handlebars",
  //     partialsDir: path.resolve("../views"),
  //     defaultLayout: false,
  //   },
  //   viewPath: path.resolve("../views"),
  //   extName: ".handlebars",
  // };

  // transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    text: message,
    // template: "email",
    // context: {
    //   title: receiverName,
    //   text: message,
    // },
  };

  console.log(mailOptions);

  transporter
    .sendMail(mailOptions)
    .then(() => {
      return res.status(200).json({
        message: "mail has been sent",
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
};

module.exports = sendMailToDev;
