
export default {
  async afterCreate(event) {
    const { result } = event;

    /* ───────────────────────── Plain-text fallback ───────────────────────── */
    const message = `
New Contact Form Submission (Metblinds)

Name           : ${result.Name}
Email          : ${result.Email}
Phone          : ${result.Phone}
Location       : ${result.Location}
Product        : ${result.Product}
Inquiry Type   : ${result.InquiryType}
Heard About Us : ${result.HeardAbout}
Message        : ${result.Message}
`;

    /* ───────────────────────── HTML version ──────────────────────────────── */
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f4f7;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f4f7; padding:20px 0;">
      <tr>
        <td align="center">
          <!-- Card -->
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial,Helvetica,sans-serif; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            <!-- Header -->
            <tr>
              <td style="background:#0a1f44; padding:24px 32px; color:#ffffff;">
                <h2 style="margin:0; font-size:22px; font-weight:600;">📩 New Contact Form Submission</h2>
                <p style="margin:4px 0 0; font-size:14px; opacity:0.85;">${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Karachi' })}</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; font-size:14px; color:#333;">
                  ${['Name','Email','Phone','Location','Product','Inquiry Type','Heard About Us','Message']
                    .map(label => {
                      const key = label.replace(/ /g,''); // Name -> Name, Heard About Us -> HeardAboutUs
                      const value = result[key] || result[label.replace(/ /g,'')] || '-';
                      return `
                        <tr>
                          <td style="padding:12px 8px; border:1px solid #eaeaea; width:35%; font-weight:600;">${label}:</td>
                          <td style="padding:12px 8px; border:1px solid #eaeaea;">${value}</td>
                        </tr>`;
                    }).join('')}
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f4f7; padding:16px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Metblinds — All rights reserved.
              </td>
            </tr>
          </table>
          <!-- /Card -->
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    try {
      await strapi
        .plugins['email']
        .services.email.send({
          to: 'muhammmadahsan2001@gmail.com',
          from: 'developersbluegen@gmail.com',
          subject: 'Metblinds – New Contact Form Submission',
          text: message,
          html,
        });

      strapi.log.info('📧 Email sent successfully after form submission');
    } catch (err) {
      strapi.log.error('❌ Failed to send contact form email:', err);
    }
  },
};
