type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.slice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  checkOut(): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho está vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`Sua pedido com total de ${this.total()} foi recebido.`);
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log('mensagem enviada:', msg);
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso.');
  }

  clear(): void {
    console.log('Carrinho de compra foi limpo...');
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({ name: 'camiseta', price: 49.9 });
shoppingCart.addItem({ name: 'caderno', price: 9.9 });
shoppingCart.addItem({ name: 'lapis', price: 1.9 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());
shoppingCart.checkOut();
console.log(shoppingCart.orderStatus);
