import EmailService from '../http/services/EmailService';
import QueueService from '../http/services/QueueService';
export default class Notify {
  constructor(
    private emailService: EmailService,
    private queueService: QueueService,
  ) {}

  async send_emails() {
    await this.queueService.consumer_queue('default', async message => {
      try {
        const data = JSON.parse(message.content.toString());

        console.log(data);

        data.users.map(user =>
          this.emailService.sendEmail(user, data.build_name),
        );
        console.log('Email enviado com sucesso:', data.email);
      } catch (error) {
        console.error('Erro ao enviar email:', error);
      }
    });
  }
}

const emailService = new EmailService();
const queueService = new QueueService();
const notify = new Notify(emailService, queueService);
notify.send_emails();
