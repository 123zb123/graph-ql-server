import nodemailer from 'nodemailer';
import * as cron from 'cron';


    // כל דקה הפונקציה נדלקת 
    let i = 0
    const job = new cron.CronJob('1 * * * * *', () => { 
        i ++
      console.log('Cron job executed!' + i);
    });
    
    // job.start();



export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port :587,
    secure : false,
    auth: {
      user: 'a548492309@gmail.com',
      pass: 'jqfv rlsr xqmt trjm'
    }
  });
  
  export const mailOptions = {
    from: 'a548492309@gmail.com',
    to: 'a548492309@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error :any, info:any ){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
