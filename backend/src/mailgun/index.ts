import formData from "form-data";
import Mailgun from "mailgun.js";
import { getMailgunConfigs } from "../config";

const mailgun = new Mailgun(formData);
const { apiKey: API_KEY, domain: DOMAIN } = getMailgunConfigs();
const mgClient = mailgun.client({
  username: "api",
  // key: API_KEY || "",
  key: API_KEY || "",
});

/**
 * Provides a uniform template on the email
 * Model Sentry or Better HTML Style
 * @param recipientEmails - list of emails to send to
 * @param subject - subject of the email
 * @param emailHTMLBody - HTML body of the email
 */
export async function sendEmailHandler(
  recipientEmails: string[],
  subject: string,
  emailHTMLBody: string
) {
  // should be a switch case that changes based on email template type
  const infoMsg = `Sending email to: ${recipientEmails}`;
  console.info(infoMsg);

  try {
    const msg = await mgClient.messages.create(DOMAIN, {
      from: "Admin <mailinglist@mg.xmodzbot.test>",
      to: recipientEmails,
      subject: subject,
      html: emailHTMLBody,
    });
    console.log(msg); // logs successful response data
    return msg;
  } catch (err) {
    throw err; // ensures the error is thrown to be caught in the calling function
  }
}
