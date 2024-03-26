import nodemailer from 'nodemailer';

interface EmailData {
  from: string;
  to: any;
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_MAIL, // sender gmail address
    pass: process.env.PASS_MAIL, // app password from gmail account
  },
});

const sendMail = async (data: EmailData) => {
  try {
    const emailOptions = {
      from: {
        name: process.env.FROM_MAIL,
        address: process.env.USER_MAIL,
      },
      to: data.to,
      subject: data.subject,
      text: data.text,
    };
    await transporter.sendMail(emailOptions as any);
    console.log('Email has been sent!');
  } catch (error) {
    console.error(error);
  }
};

export { EmailData, sendMail };
