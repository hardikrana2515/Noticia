import nodemailer from 'nodemailer'
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.My_Mail,
    pass: process.env.Paaskey,
  },
});

// Wrap in an async IIFE so we can use await.
const Mail = async (to, subject, text, html = null) => {
  try {

    const info = await transporter.sendMail({
      from: '"Noticia " <ranahardikrajeshbhai@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent: ", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email", err.message);
  }
};

export default Mail