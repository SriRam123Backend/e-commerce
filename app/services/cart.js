import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CartService extends Service {
  @service store;
  @tracked cartList = [];
  @tracked currentcustomer;
  add(item, color) {
    const data = this.store.peekRecord('cart', '1');
    let existingItem = false;
    if (data != null) {
      console.log(data.products);
      let pro = data.products.toArray();
      console.log(pro);
      existingItem = pro.some((products) => {
        return products.id === String(item.id);
      });
    }
    console.log(existingItem);
    if (existingItem) {
      alert('This product is already in the cart');
    } else {
      let details = {};
      details.productId = Number(item.id);
      details.userId = this.currentcustomer.id;
      details.color = color;
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
            let productsArray = cartProduct.products;
            if (this.cartList.length < 2) {
              this.store.pushPayload({ cart: cartProduct.cart });
              this.store.pushPayload({ products: productsArray });
            } else {
              let cartStore = this.store.peekRecord('cart', 1);
              cartStore.products = productsArray;
            }
            this.cartList = productsArray;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  remove(item) {
    let details = {};
    details.productId = Number(item.id);
    details.userId = this.currentcustomer.id;
    $.ajax({
      method: 'POST',
      url: '/e_commerce/removeFromCart',
      data: JSON.stringify(details),
      contentType: 'application/json',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response, textStatus, xhr) => {
        if (xhr.status === 200 && textStatus === 'success') {
          const index = this.cartList.indexOf(item);
          const cartList = this.cartList;
          cartList.splice(index, 1);
          this.cartList = cartList;
          let cartStore = this.store.peekRecord('cart', 1);
          cartStore.products = cartList;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
