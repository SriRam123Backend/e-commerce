import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ItemDetailsComponent extends Component {
  @service cart;

  @action
  addToCart() {
    const { product, color } = this.args;
    this.cart.add(product, color);
  }

  @action
  alert() {
    alert('This product is already in the cart');
  }
}
