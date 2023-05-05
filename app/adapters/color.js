import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';

export default class ColorAdapter extends JSONAPIAdapter {

    @service cart;

    urlForDeleteRecord(id,store,model,record) {
        return `http://localhost:4200/e_commerce/delete?id=${id}&productId=${model.record.product.content.id}&userId=${this.cart.currentcustomer.id}`;
      }
}
