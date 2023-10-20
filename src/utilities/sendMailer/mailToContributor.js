const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMailToContributor = async (req, res) => {
  const { firstMember, secondMember, thirdMember, fourthMember, admin } =
    req.body;

  const config = {
    host: "smtp.gmail.com",
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
      name: "Dear Developer",
      intro: "You are selected to a project",
      action: {
        instructions: "To get more details about project, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Go To Website -->",
          link: "https://web-Tech-Solution.com/admin-profile/dashboard/new-task-list",
        },
      },
      outro: "We appreciate working with you",
    },
  };

  const mail = mailGenerator.generate(email);

  const mailInfo = {
    from: "anasibnali523@gmail.com",
    to: [firstMember, secondMember, thirdMember, fourthMember],
    cc: admin,
    subject: "Your are Assigned to a Project",
    html: mail,
  };

  transporter
    .sendMail(mailInfo)
    .then(() => {
      return res.status(200).json({
        message: "mail has been sent",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Failed to send mail",
        error: error
      });
    });
};

module.exports = sendMailToContributor;
