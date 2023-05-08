import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductPageRoute extends Route {
  @service store;
  @service cart;
  @service product;


  async beforeModel() {
    return this.product.productLoad();
  }

  async model() {
    return this.store.peekAll('product');
  }
}
