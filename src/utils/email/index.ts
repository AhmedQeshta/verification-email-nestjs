import * as nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { MAIL_HOST, MAIL_USER, MAIL_PASS, EMAIL_SENDER } = process.env;

    const transport = nodemailer.createTransport({
      host: MAIL_HOST,
      port: 2525,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    await transport.sendMail({
      from: EMAIL_SENDER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
}

export default sendEmail;
