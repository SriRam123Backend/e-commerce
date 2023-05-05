import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductPageRoute extends Route {
  @service store;
  @service cart

  async beforeModel() {
    $.ajax({
      method: 'POST',
      url: '/e_commerce/products',
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: {
        userID: this.cart.currentcustomer.id,
      },
    })
      .then((response, textStatus, xhr) => {
        if (xhr.status === 200 && textStatus === 'success') {
          let productDetails = JSON.parse(response);
          this.store.pushPayload({ products: productDetails.products });
          productDetails.colors.map((col) => {
            this.store.pushPayload({colors : col});
          })
          if(productDetails?.cart.products.products != undefined)
          {
            let cartProduct = productDetails.cart;
            let productsArray = cartProduct.products.products;
                this.cart.cartList = this.store.push( this.store.normalize('cart',cartProduct.cart));
                this.store.pushPayload({ products: productsArray });
                cartProduct.products.colors.map((col) => {
                      this.store.pushPayload({colors : col});
              })
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async model() {
    return this.store.peekAll('product');
  }
}
