import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ItemController extends Controller {
  @service cart;

  @computed('cart.cartList.length', 'model.id')
  get cartThings() {
    const product = this.model;
    console.log(
      this.cart.cartList.some((cartproduct) => cartproduct.id == product.id)
    );
    return this.cart.cartList.some(
      (cartproduct) => cartproduct.id == product.id
    );
  }
}
