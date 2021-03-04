const test = require('./services/rabbitmq')

const newQueue = new test('amqp://guest:guest@localhost:5672','dronesEmail','dronesEmailExchange', 'drones.id.*')

newQueue.listen((message) => {
    console.log(message)
})