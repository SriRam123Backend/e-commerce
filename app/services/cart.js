import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CartService extends Service {
  @service store;
  @tracked cartList = [];
  @tracked currentcustomer;
  add(item, color) {
    const data = this.store.peekAll('cart');
    const existingItem = data.find(({ productid }) => {
      return productid === item.id;
    });

    if (existingItem) {
      alert('This product is already in the cart');
    } else {
      let details = {};
      details.productId = Number(item.id);
      details.userId = this.currentcustomer.id;
      $.ajax({
        method: 'POST',
        url: '/e_commerce/cart',
        data: JSON.stringify(details),
        contentType: 'application/json',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then((response, textStatus, xhr) => {
          if (xhr.status === 200 && textStatus === 'success') {
            let cartProduct = JSON.parse(response);
            let productsArray = cartProduct.cart.products;
            console.log(cartProduct);
            this.store.pushPayload({ products: productsArray});
            // console.log(newCart);
            // this.store.pushPayload({ cart: newCart });
            // let summa = this.store.peekRecord('cart', '1');
            // console.log(summa);
            // console.log(summa.products);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  remove(item) {
    const index = this.cartList.indexOf(item);
    const cartList = this.cartList;
    cartList.splice(index, 1);
    this.cartList = cartList;
  }
}
