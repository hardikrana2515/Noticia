 const mailHtmlRes= (name,username,password)=>{
  return(`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="text-align: center; color: #333;">Welcome to <span style="color: #007bff;">Noticia</span> 📰</h2>
    <p>Hi <strong>${name}</strong>,</p>

    <p>Thanks for registering with <strong>Noticia</strong> — your go-to place for powerful note-taking and personal productivity.</p>

    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
      <p><strong>Your login credentials:</strong></p>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Password:</strong> ${password}</p>
    </div>

    <p>Please keep your credentials safe. You can now log in and start using the app.</p>

    <p>Need help? Just reply to this email. We're here for you!</p>

    <p style="margin-top: 40px;">Best regards,<br><strong>The Noticia Team 🚀</strong></p>
  </div>
`)
}

export default mailHtmlRes