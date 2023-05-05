import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ItemComponent extends Component {
  @service router;
  @service cart;

  @tracked color = this.args.product.colors.toArray()[0].color;

  @tracked zoom = false;

  get productImage() {
    const { image } = this.args.product.colors.find(
      ({ color }) => color === this.color
    );
    return image;
  }

  @computed('cart.cartList.length', 'args.id','color')
  get cartThings() {
    const product = this.args.product;
    let productList = this.cart.cartList?.products.toArray();
    const item = productList?.find((cartproduct) => cartproduct.id == product.id);
    if (!item) {
        return false;
      }
      return this.cart.cartList.colors.toArray().some(product => product.color == this.color);
  }

  @action
  updateColor(color) {
    this.color = color;
  }

  @action
  toggleZoom() {
    if (this.args.isDetails) {
      this.zoom = !this.zoom;
    }
  }
}
