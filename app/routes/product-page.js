import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductPageRoute extends Route {
  @service store;

  async beforeModel() {
    $.ajax({
      method: 'POST',
      url: '/e_commerce/products',
      contentType: 'application/json',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response, textStatus, xhr) => {
        console.log(xhr.status);
        if (xhr.status === 200 && textStatus === 'success') {
          let productDetails = JSON.parse(response);
          this.store.pushPayload({ products: productDetails.products });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  async model() {
    return this.store.peekAll('product');
  }
}
