const express = require("express");
const sendMailToClient = require("../utilities/sendMailer/mailToClient");
const sendMailToContributor = require("../utilities/sendMailer/mailToContributor");
const sendMailToDev = require("../utilities/sendMailer/mailToDev");
const sendMailer = require("../utilities/sendMailer/sendMailer");

const router = express.Router();

// mail send to client after submitting project
router.post("/mailToClient", sendMailToClient);

// mail send to dev after assigning project
router.post("/mailToContributor", sendMailToContributor);

// mail send to developer
router.post("/mailToDev", sendMailToDev);

// generic mail function for all mail //
router.post("/sendMail", sendMailer);

module.exports = router;
