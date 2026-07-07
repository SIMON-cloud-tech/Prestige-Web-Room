const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@jamsi.co.ke';
const TO_EMAIL = process.env.SENDGRID_TO_EMAIL || 'hello@jamsi.co.ke';

/**
 * Send an email using SendGrid
 */
const sendEmail = async ({ to, from, subject, html, text }) => {
  try {
    const msg = {
      to,
      from: from || FROM_EMAIL,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error.message);
    throw new Error('Failed to send email');
  }
};

/**
 * Send admin notification for a new contact
 */
const sendContactEmail = async ({ name, email, message, projectType, budget }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>
      body { font-family: Arial, sans-serif; color: #1B2A4A; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAAA00; border-radius: 8px; }
      .header { background: #1B2A4A; color: #EAAA00; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { padding: 20px; background: #FFEBCD; border-radius: 0 0 8px 8px; }
      .field { margin-bottom: 12px; }
      .label { font-weight: bold; color: #1B2A4A; }
      .value { color: #2D2D3A; }
      .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; border-top: 1px solid #EAAA00; padding-top: 16px; }
    </style></head>
    <body>
      <div class="container">
        <div class="header"><h2>📬 New Contact Submission</h2><p style="color:#fff;">JAMSI Technologies</p></div>
        <div class="content">
          <div class="field"><div class="label">Name:</div><div class="value">${name}</div></div>
          <div class="field"><div class="label">Email:</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
          <div class="field"><div class="label">Project Type:</div><div class="value">${projectType || 'Not specified'}</div></div>
          <div class="field"><div class="label">Budget:</div><div class="value">${budget || 'Not specified'}</div></div>
          <div class="field"><div class="label">Message:</div><div class="value">${message}</div></div>
        </div>
        <div class="footer"><p>&copy; 2026 JAMSI Technologies</p></div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: TO_EMAIL,
    from: FROM_EMAIL,
    subject: `New Contact from ${name} - JAMSI Technologies`,
    html,
  });
};

/**
 * Send a thank‑you email to the sender
 */
const sendThankYouEmail = async ({ name, email }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>
      body { font-family: Arial, sans-serif; color: #1B2A4A; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAAA00; border-radius: 8px; }
      .header { background: #1B2A4A; color: #EAAA00; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { padding: 20px; background: #FFEBCD; border-radius: 0 0 8px 8px; }
      .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; border-top: 1px solid #EAAA00; padding-top: 16px; }
    </style></head>
    <body>
      <div class="container">
        <div class="header"><h2>Thank You for Reaching Out! 🙌</h2><p style="color:#fff;">JAMSI Technologies</p></div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for contacting <strong>JAMSI Technologies</strong>. We've received your message and will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>📱 <strong>WhatsApp us</strong> at <a href="https://wa.me/254703433014" style="color:#EAAA00;">+254 703 433 014</a></li>
            <li>📧 <strong>Email us</strong> at <a href="mailto:hello@jamsi.co.ke" style="color:#EAAA00;">hello@jamsi.co.ke</a></li>
          </ul>
          <p>We look forward to building something amazing together!</p>
          <p style="margin-top:24px;">Best regards,<br><strong style="color:#EAAA00;">Simon Mbithi</strong><br>Founder, JAMSI Technologies</p>
        </div>
        <div class="footer"><p>&copy; 2026 JAMSI Technologies<br>Built with ❤️ in Kenya</p></div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    from: FROM_EMAIL,
    subject: 'Thank You for Contacting JAMSI Technologies',
    html,
  });
};

module.exports = {
  sendEmail,
  sendContactEmail,
  sendThankYouEmail,
};