const amqp = require('amqplib')

class RabbitMq {
    constructor(stringConenction, queue, exchangeName, pattern){
        this.exchangeName = exchangeName;
        this.pattern = pattern;
        this._stringConnection = `${stringConenction}`;
        this.queue = queue;
    }

    async listen(callBack){
        this.connection = await amqp.connect(this._stringConnection)
        this.channel = await this.connection.createChannel()

        await this.channel.assertQueue(this.queue)
        await this.channel.assertExchange(this.exchangeName, 'topic')

        await this.channel.bindQueue(this.queue, this.exchangeName, this.pattern)

        this.channel.consume(this.queue, callBack);
    }


}

module.exports = RabbitMq;