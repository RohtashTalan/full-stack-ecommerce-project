import transporter from "../config/transporter.config";
import config from "../config/index";


const mailHelp = async(options) =>{
    const message = {
        from: config.SMTP_MAIL_EMAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.text, // plain text body
        // html: options.html, // html body
    }

    await transporter.sendMail(message);
}


export default mailHelp;