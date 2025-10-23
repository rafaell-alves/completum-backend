import client, { Connection, Channel } from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
export default class QueueService {
  connection!: Connection;
  channel!: Channel;
  private connected!: boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;
    try {
      this.connection = await client.connect(
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:5672`,
      );
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }
  async consumer_queue(
    queue: string | null = null,
    callback: (message) => void,
  ) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      if (queue == null) queue = process.env.RABBIT_MQ_DEFAULT_QUEUE as string;
      console.log(queue);
      await this.channel.assertQueue(queue, { durable: true }); // durable: false means queue is deleted on broker restart

      console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

      // 3. Start consuming messages
      this.channel.consume(
        queue,
        message => {
          if (message !== null) {
            console.log(`Received: ${message.content.toString()}`);
            callback(message);
            // Acknowledge the message to remove it from the queue
            this.channel.ack(message);
          }
        },
        { noAck: false },
      ); // noAck: false means manual acknowledgment is required
      // this.connection.close();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async publish_message(queue: string | null = null, message: object) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      if (queue == null) queue = process.env.RABBIT_MQ_DEFAULT_QUEUE as string;

      const exchangeName = 'QUEUE_EXCHANGE';
      await this.channel.assertExchange(exchangeName, 'fanout', {
        durable: false,
      });

      await this.channel.bindQueue(queue, exchangeName, ''); // Empty routing key for fanout exchange

      const buffer = await Buffer.from(JSON.stringify(message));
      await this.channel.publish(exchangeName, '', buffer); // Empty routing key for fanout exchange

      // this.connection.close();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
