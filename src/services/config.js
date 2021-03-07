const dotenv = require('dotenv')

dotenv.config()

module.exports = () => {
    return({
        rabbit: {
            connection: process.env.RABBITMQ_CONNECTION,
            queue: process.env.RABBITMQ_QUEUE,
            exchange: process.env.RABBITMQ_EXCHANGE,
            pattern: 'drones.id.*'
        },
        email: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: process.env.EMAIL_SUBJECT
        }
    })
}
