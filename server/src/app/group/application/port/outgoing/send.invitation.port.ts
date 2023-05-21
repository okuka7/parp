export const SEND_INVITATION_PORT = Symbol('SendInvitationPort');

export interface SendInvitationPort {
  sendInviteMail(email: string, url: string, groupName: string): Promise<void>;
}
