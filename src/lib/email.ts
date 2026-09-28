/**
 * Outgoing email. No provider is configured yet — messages are logged
 * to the server console in development. Plug in your provider
 * (Resend, Postmark, SES, SendGrid…) inside `sendEmail`.
 */
export async function sendEmail(msg: { to: string; subject: string; text: string }) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`\n📧 [email:dev] To: ${msg.to}\nSubject: ${msg.subject}\n\n${msg.text}\n`);
    return;
  }
  // TODO: integrate your email provider here.
  console.warn(`[email] No email provider configured; message to ${msg.to} was not sent.`);
}
