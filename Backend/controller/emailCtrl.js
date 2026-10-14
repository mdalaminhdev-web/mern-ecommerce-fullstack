const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user: process.env.MAIL_ID, pass: process.env.MP },
  });
  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_ID,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  });
};

module.exports = sendEmail;
