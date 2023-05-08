import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';

export default class ColorAdapter extends JSONAPIAdapter {

    @service cart;

    buildURL(modelName, id, snapshot, requestType, query) {
        const url = `http://localhost:4200/e_commerce/delete?id=${id}&productId=${snapshot.record.product.content.id}&userId=${this.cart.currentcustomer.id}`;
        return url;
      }
}
