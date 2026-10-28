import nodemailer from "nodemailer";

const getTransporter = () => {
  const user = process.env.My_Mail ? process.env.My_Mail.replace(/"/g, "").trim() : null;
  const pass = process.env.Paaskey ? process.env.Paaskey.replace(/"/g, "").trim() : null;

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

    const senderMail = process.env.My_Mail ? process.env.My_Mail.replace(/"/g, "").trim() : "";
    const info = await transporter.sendMail({
      from: `"WordLoom" <${senderMail}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
};

export default Mail;
