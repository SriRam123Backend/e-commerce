import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ItemRoute extends Route {
  @service store;
  @service cart;

  async model(params) {
    const { item_id } = params;
    const data = await this.store.peekAll('product');
    const product = data.find(({ id }) => id === item_id);
    return product;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.color = model.colors.toArray()[0].color;
  }
}
