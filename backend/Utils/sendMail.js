import nodemailer from "nodemailer";

const getTransporter = () => {
  const user = process.env.My_Mail;
  const pass = process.env.Paaskey;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
};

const Mail = async (to, subject, text, html = null) => {
  try {
    const transporter = getTransporter();
    if (!transporter) {
      console.warn("⚠️ Nodemailer credentials not fully configured. Skipping email dispatch.");
      return;
    }

    const info = await transporter.sendMail({
      from: `"Noticia" <${process.env.My_Mail}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
};

export default Mail;
