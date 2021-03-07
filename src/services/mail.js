const nodemailer = require('nodemailer')
const fs = require('fs')

const htmlEmail = fs.rea


class Mail {
    constructor(host, port, user, pass, to, from, subject){
        this.to = to;
        this.from = from;
        this.subject = subject;

        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            auth: {
                user: user,
                pass: pass
            }
        });
    }

    async send(message){
        const htmlData = await this.loadHtml();
        const htmlSub = htmlData.replace('{{data}}', message);
        await this.transporter.sendMail({
            to: this.to,
            from: this.from,
            subject: this.subject,
            html: htmlSub

        })
    }

    async loadHtml(){
        return new Promise((resolve, reject) => {
            fs.readFile('./src/public/email.html', 'utf8', (err, data) => {
                if(err) return reject(err)

                resolve(data)
            })
        })
    }
}

module.exports = Mail