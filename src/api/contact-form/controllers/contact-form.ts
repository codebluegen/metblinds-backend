import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::contact-form.contact-form',
  ({ strapi }) => ({
    async create(ctx) {
      /* ── Save entry ─────────────────────────────────────────────── */
      console.log('🔍 Incoming form data:', ctx.request.body);

      const response = await super.create(ctx);
      const entryId = response.data.id;
      const entry = await strapi.entityService.findOne(
        'api::contact-form.contact-form',
        entryId
      );


         /* ── cell style helpers ───────────────────────── */
      const cellL =
        'padding:12px 8px;border:1px solid #eaeaea;width:35%;font-weight:600;';
      const cellR =
        'padding:12px 8px;border:1px solid #eaeaea;';

      console.log('📦 Saved entry:', entry);

      /* ── Plain-text fallback ─────────────────────────────────────── */
      const text = `
New Contact Form Submission (Metblinds)

Name           : ${entry.Name}
Email          : ${entry.Email}
Phone          : ${entry.Phone || '-'}
Location       : ${entry.Location}
Product        : ${entry.Product}
Inquiry Type   : ${entry.InquiryType}
Heard About Us : ${entry.HeardAbout}
Message        : ${entry.Message}
`;

      /* ── HTML template ───────────────────────────────────────────── */
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
          <table width="600" cellpadding="0" cellspacing="0" role="presentation"
                 style="background:#ffffff; border-radius:8px; overflow:hidden;
                        font-family:Arial,Helvetica,sans-serif;
                        box-shadow:0 2px 8px rgba(0,0,0,.08);">
            <!-- Header -->
            <tr>
              <td style="background:#0a1f44; padding:24px 32px; color:#ffffff;">
                <h2 style="margin:0; font-size:22px; font-weight:600;">
                  📩 New Contact Form Submission
                </h2>
                <p style="margin:4px 0 0; font-size:14px; opacity:.85;">
                  ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Karachi' })}
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                       style="border-collapse:collapse; font-size:14px; color:#333;">
                  <tr><td style="${cellL}">Name:</td><td style="${cellR}">${entry.Name}</td></tr>
                  <tr><td style="${cellL}">Email:</td><td style="${cellR}">${entry.Email}</td></tr>
                  <tr><td style="${cellL}">Phone:</td><td style="${cellR}">${entry.Phone || '-'}</td></tr>
                  <tr><td style="${cellL}">Location:</td><td style="${cellR}">${entry.Location}</td></tr>
                  <tr><td style="${cellL}">Product:</td><td style="${cellR}">${entry.Product}</td></tr>
                  <tr><td style="${cellL}">Inquiry Type:</td><td style="${cellR}">${entry.InquiryType}</td></tr>
                  <tr><td style="${cellL}">Heard About Us:</td><td style="${cellR}">${entry.HeardAbout}</td></tr>
                  <tr><td style="${cellL}">Message:</td><td style="${cellR}">${entry.Message}</td></tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f4f7; padding:16px; text-align:center;
                         font-size:12px; color:#888;">
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
`.replace(/\${cellL}/g, 'padding:12px 8px;border:1px solid #eaeaea;width:35%;font-weight:600;')
 .replace(/\${cellR}/g, 'padding:12px 8px;border:1px solid #eaeaea;');

      /* ── Send the email ─────────────────────────────────────────── */
      try {
        await strapi.plugins['email'].services.email.send({
          to: [
           // 'muhammmadahsan2001@gmail.com',
            'support@bluegenstudios.com',
            'info@metblinds.com',
            'hammad@metblinds.com',
          ],
          from: 'developersbluegen@gmail.com',
          subject: `Metblinds – New Contact Form Submission from ${entry.Name}`,
          text,
          html,
        });

        strapi.log.info('📧 Email sent successfully');
      } catch (err) {
        strapi.log.error('❌ Failed to send email:', err);
      }

      return response;
    },
  })
);
