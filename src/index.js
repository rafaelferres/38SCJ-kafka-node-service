const rabbitmq = require('./services/rabbitmq')
const getConfig = require('./services/config')
const Mail = require('./services/mail')

const config = getConfig();


const queue = new rabbitmq(config.rabbit.connection, config.rabbit.queue, config.rabbit.exchange, config.rabbit.pattern);
const mail = new Mail(config.email.host, config.email.port, config.email.user, config.email.pass, config.email.to, config.email.from, config.email.subject);

//let counterById = {};

queue.listen((message) => {
    const parsedData = JSON.parse(message.content.toString());
    console.log('[AMQP] Data Received')
    if(parsedData.temperatura >=35 || parsedData.temperatura <=0 || parsedData.umidade <= 15){
        let message = `<p style="color: #000">Identificador do Drone: <b>${parsedData.idDrone}</b></p><table style="border-collapse: collapse; width: 100%;" border="0"><tbody><tr><td style="width: 20%;"><b>Latitude</b></td><td style="width: 20%;"><b>Longitude</b></td><td style="width: 20%;"><b>Temperatura</b></td><td style="width: 20%;"><b>Umidade</b></td><td style="width: 20%;"><b>Data</b></td></hr>`;
        message = message + `<tr><td style="width: 20%;">${parsedData.latitude}</td><td style="width: 20%;">${parsedData.longitude}</td><td style="width: 20%;">${parsedData.temperatura}ºC</td><td style="width: 20%;">${parsedData.umidade}%</td><td style="width: 20%;">${dataAtualFormatada(parsedData.date)}</td></hr>`;
        message = message + "</tbody></table>";
        mail.send(message);
    }

    queue.channel.ack(message);
})

function dataAtualFormatada(value){
    const data = new Date(value);
    var dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear(),
        hora = data.getHours().toString().padStart(2, '0'),
        minuto = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}