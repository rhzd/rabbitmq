#!/usr/bin/env node
async function demo() {
    const delay = (ms) => new Promise((resolve => setTimeout(resolve, ms)));
    try {
        var amqp = require('amqplib/callback_api');

        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }

                var queue = 'hello';
                var msg = 'Hello World!';
                let calculate = 223 + 434 % 3

                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(calculate.toString()));
                console.log(" [x] Sent %s", msg);
            });
            setTimeout(function() {
                connection.close();
                process.exit(0);
            }, 500);
        });
    } catch (error) {
        console.log(error);
    }
}

demo();