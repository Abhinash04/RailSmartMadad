const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/", // update this link with your actual website link
  },
});

exports.registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Body of the email
  var email = {
    body: {
      name: username,
      intro: text || "Welcome to RailMadad! We are very excited to have you on board.",
      outro: "Need help, or have questions? Just reply to this email, we would love to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject || "Registration Successful",
    html: emailBody,
  };

  // Send mail
  transporter.sendMail(message)
    .then(() => {
      return res.status(200).send({ msg: "Email Sent." });
    })
    .catch(error => {
      console.error("Error sending email:", error);
      return res.status(500).send({ error: "Failed to send email." });
    });
};