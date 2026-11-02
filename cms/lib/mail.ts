import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.SMTP_USER || "roysambu@densmiledentalclinic.co.ke";
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    console.warn("SMTP_PASS not set. Emails will be logged to console only.");
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
  });
}

export async function sendAppointmentAlert(data: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  preferred_date?: string;
  message?: string;
}) {
  const transporter = getTransporter();
  const recipient = process.env.NOTIFICATION_EMAIL || "roysambu@densmiledentalclinic.co.ke";
  const cleanPhone = (data.phone || "").replace(/\D/g, "");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden;">
      <div style="background: #9e0066; padding: 20px; color: #ffffff; text-align: center;">
        <h2 style="margin: 0; font-size: 22px;">🦷 New Patient Appointment Request</h2>
        <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Densmile Dental Clinic</p>
      </div>

      <div style="padding: 24px; background: #ffffff;">
        <p style="font-size: 15px; color: #334155;">A new booking inquiry has been submitted through the clinic website:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; width: 140px;"><b>Patient Name:</b></td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;"><b>Phone Number:</b></td>
            <td style="padding: 10px 0; color: #0f172a;">
              <a href="tel:${data.phone}" style="color: #9e0066; font-weight: bold; text-decoration: none;">${data.phone}</a>
              ${cleanPhone ? `&nbsp;(<a href="https://wa.me/${cleanPhone}" style="color: #16a34a; text-decoration: none; font-weight: bold;">WhatsApp Chat</a>)` : ""}
            </td>
          </tr>
          ${data.email ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;"><b>Email Address:</b></td>
            <td style="padding: 10px 0; color: #0f172a;">${data.email}</td>
          </tr>` : ""}
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;"><b>Requested Treatment:</b></td>
            <td style="padding: 10px 0; color: #0f172a;">${data.service || "General Consultation"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;"><b>Preferred Date:</b></td>
            <td style="padding: 10px 0; color: #0f172a;">${data.preferred_date || "Flexible"}</td>
          </tr>
          ${data.message ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><b>Symptoms / Notes:</b></td>
            <td style="padding: 10px 0; color: #0f172a; font-style: italic;">“${data.message}”</td>
          </tr>` : ""}
        </table>

        <div style="text-align: center; margin-top: 24px;">
          <a href="https://densmile-cms-kohl.vercel.app/admin/appointments" style="background: #9e0066; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; display: inline-block;">
            Manage in Clinical Portal
          </a>
        </div>
      </div>

      <div style="background: #f8fafc; padding: 14px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
        Densmile Dental Clinic · Automated Patient Triage System
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("--- SIMULATED APPOINTMENT EMAIL ---\n", html);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Densmile Clinic" <${process.env.SMTP_USER || "roysambu@densmiledentalclinic.co.ke"}>`,
      to: recipient,
      subject: `🦷 New Appointment Request: ${data.name} (${data.service || "Dental Checkup"})`,
      html,
    });
    console.log("✓ Appointment alert email delivered to", recipient);
  } catch (err) {
    console.error("Failed to send appointment alert email:", err);
  }
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const transporter = getTransporter();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden;">
      <div style="background: #9e0066; padding: 20px; color: #ffffff; text-align: center;">
        <h2 style="margin: 0; font-size: 20px;">🔒 Password Reset Request</h2>
        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Densmile Clinical Administration</p>
      </div>

      <div style="padding: 24px; background: #ffffff;">
        <p style="font-size: 14.5px; color: #334155;">Hello,</p>
        <p style="font-size: 14px; color: #334155; line-height: 1.5;">
          A password reset was requested for your Densmile Clinical Portal account (<b>${email}</b>). Click the button below to set a new password:
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${resetUrl}" style="background: #9e0066; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reset My Password
          </a>
        </div>

        <p style="font-size: 12.5px; color: #64748b;">
          This link will expire in <b>1 hour</b>. If you did not request this, please ignore this email.
        </p>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("--- SIMULATED RESET EMAIL URL ---\n", resetUrl);
    return;
  }

  await transporter.sendMail({
    from: `"Densmile Admin" <${process.env.SMTP_USER || "roysambu@densmiledentalclinic.co.ke"}>`,
    to: email,
    subject: "Densmile Portal - Password Reset Instructions",
    html,
  });
}
