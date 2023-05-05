import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartController extends Controller {
  @service cart;

  get subtotal() {
    return this.cart.cartList.products.toArray().reduce((total, item) => {
      return total + parseFloat(item.price.current);
    }, 0);
  }

  get tax() {
    return parseFloat((this.subtotal * 0.09).toFixed(2));
  }

  get total() {
    return this.subtotal + this.tax;
  }

  @action
  image(args) {
    let img = this.cart.cartList.colors
      .toArray()
      .filter((img) => img.color == args);
    return img[0].image;
  }

  @action
  changeItemCount(item, event) {
    item.count = parseInt(event.target.value);
    if (item.count === 0) {
      this.cart.remove(item);
    }
  }

  @action
  removeItem(id) {
    this.cart.remove(id);
  }
}
