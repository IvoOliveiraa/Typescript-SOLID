import { OrderStatus } from './interface/order-status';
import { CustomerOrder } from './interface/customer-protocol';
import { ShoppingCartProtocol } from './interface/shopping-cart-protocol';
import { MessagingProtocol } from './interface/messaging-protocol';
import { PersistencyProtocol } from './interface/persistency-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkOut(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio.');
      return;
    }

    this._orderStatus = 'closed';

    this.messaging.sendMessage(
      `Sua pedido com total de ${this.cart.totalWithDiscount()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
    console.log('O cliente é', this.customer.getName(), this.customer.getIDN());
  }
}
