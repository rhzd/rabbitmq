#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'task_queue';

    channel.assertQueue(queue, {
      durable: true
    });
    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;
      console.log(" [x] Received %s", msg.content.toString());

      let arr = []

      for (let step = 0; step < 20; step++) {
        arr.push(step)
      }

      arr.forEach(element => {
        console.log(element);
      });

      console.log(" [x] Done");
    }, {
      // manual acknowledgment mode,
      // see https://www.rabbitmq.com/confirms.html for details
      noAck: true
    });
  });
});