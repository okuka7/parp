import { MailerService } from '@nestjs-modules/mailer';
import { SendInvitationPort } from '../../application/port/outgoing/send.invitation.port';

export class InviteMailAdapter implements SendInvitationPort {
  constructor(private readonly mailer: MailerService) {}
  sendInviteMail(email: string, url: string, groupName: string): Promise<void> {
    return this.mailer.sendMail({
      to: email,
      subject: 'Invitation to group',
      template: 'invite.hbs',
      context: {
        url,
        groupName,
      },
    });
  }
}
