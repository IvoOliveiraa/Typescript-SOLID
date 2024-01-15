import { MessagingProtocol } from '../classes/interface/messaging-protocol';

export class Messaging implements MessagingProtocol {
  sendMessage(msg: string): void {
    console.log('mensagem enviada:', msg);
  }
}
