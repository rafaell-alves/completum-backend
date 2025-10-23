import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { UserResponse } from '../dto/user';
import { env } from 'process';
export default class EmailService {
  private gmailOption = {
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER_GMAIL, // Your Gmail address
      pass: env.PASSWORD_EMAIL_GMAIL, // Your Gmail password or App Password
    },
  };
  private hbsOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.join(process.cwd(), 'src', 'app', 'views'),
      defaultLayout: false,
    },
    viewPath: path.join(process.cwd(), 'src', 'app', 'views'),
    extName: '.handlebars',
  };

  public async sendEmail(data_user: UserResponse, build_name: string) {
    let transporter = nodemailer.createTransport(this.gmailOption);
    transporter.use('compile', hbs(this.hbsOptions));
    console.log(build_name);
    const emailOptions = {
      from: env.EMAIL_FOR_SEND, // Sender address
      to: data_user.email, // List of recipients
      subject: '🎮 Nova Build Disponível no Completum!', // Subject line
      template: 'email',
      context: {
        user_name: data_user.name,
        build_name: build_name,
      },
    };
    transporter.sendMail(emailOptions, (error, info) => {
      console.log(error);
      console.log(info);
    });
  }
}
