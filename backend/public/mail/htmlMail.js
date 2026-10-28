const mailHtmlRes = (name, username) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="text-align: center; color: #1e40af;">Welcome to <span style="color: #2563eb;">Noticia</span> 📰</h2>
    <p>Hi <strong>${name}</strong>,</p>

    <p>Thanks for registering with <strong>Noticia</strong> — your personal workspace for notes, ideas, and productivity.</p>

    <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0 0 8px 0; font-weight: bold; color: #166534;">Your Account Details:</p>
      <p style="margin: 0;"><strong>Username:</strong> ${username}</p>
    </div>

    <p>Your account is ready! Log in anytime to start capturing your thoughts securely.</p>

    <p>Need help? Feel free to reach out to our team.</p>

    <p style="margin-top: 30px; color: #475569;">Best regards,<br><strong>The Noticia Team 🚀</strong></p>
  </div>`;
};

export default mailHtmlRes;
