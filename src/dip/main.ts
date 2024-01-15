import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { NoDiscount } from './classes/discount';
import { EnterpriseCustomer } from './classes/customer';

//const fiftyPercentDiscount = new FiftyPercentDiscount();
//const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
/*const individualCustomer = new IndividualCustomer(
  'Teste',
  'Testando',
  '111.111.111-11',
);*/

const enterpriseCustomer = new EnterpriseCustomer(
  'Empresa',
  '00000000000000000',
);

const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('camiseta', 49.9));
shoppingCart.addItem(new Product('caderno', 9.9));
shoppingCart.addItem(new Product('lapis', 1.9));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
order.checkOut();
console.log(order.orderStatus);
