import { createTransport } from "nodemailer";

const sendMessage = async ({ fullName, message, email, subject }) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background:#f5f5f5; padding:0; margin:0;">

  <div style="max-width:600px; margin:20px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.05);">

    <!-- Header -->
    <div style="background:#2c2a29; padding:15px; text-align:center;">
      <h1 style="margin:0; color:#e6c27a; font-size:24px; letter-spacing:1px;">IshwaRugs</h1>
      <p style="margin:5px 0 0; color:#d1cfc9; font-size:12px;">Handcrafted Luxury Carpets</p>
    </div>

    <!-- Content -->
    <div style="padding:20px 25px;">
      <p>Hi <strong>${fullName}</strong>,</p>

      <p>Thank you for reaching out to <strong>IshwaRugs</strong>.</p>

      <p>We have successfully received your inquiry regarding:</p>

      <blockquote style="margin: 12px 0; padding:12px; background:#f7f7f7; border-left:4px solid #d4af37; font-size:14px;">
        <strong>Subject:</strong> ${subject}<br/><br/>
        <strong>Message:</strong><br/> ${message}
      </blockquote>

      <p>Our support team will get back to you within the next 24–48 hours.</p>

      <p>If your inquiry is urgent, please feel free to contact us directly.</p>

      <br/>
      <p style="margin:0;"><strong>Best Regards,</strong></p>
      <p style="margin:0;">Customer Support Team</p>
      <p style="margin:0;"><strong>IshwaRugs</strong></p>
    </div>

    <!-- Footer -->
    <div style="background:#faf9f7; text-align:center; padding:12px;">
      <p style="margin:0; font-size:12px; color:#777;">
        © ${new Date().getFullYear()} IshwaRugs. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
`;


await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    html,
  });
};


export default sendMessage;