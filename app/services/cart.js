import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CartService extends Service {
  @service store;
  @tracked cartList;
  @tracked currentcustomer;
  add(item, color) {
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
          let productsArray = cartProduct.products.products;
          this.cartList = this.store.push(
            this.store.normalize('cart', cartProduct.cart)
          );
          this.store.pushPayload({ products: productsArray });
          cartProduct.products.colors.map((col) => {
            this.store.pushPayload({ colors: col });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  remove(id) {
    let details = {};
    details.productId = Number(id);
    details.userId = this.currentcustomer.id;
    details.color = color;
    $.ajax({
      method: 'POST',
      url: '/e_commerce/remove',
      data: JSON.stringify(details),
      contentType: 'application/json',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response, textStatus, xhr) => {
        if (xhr.status === 200 && textStatus === 'success') {
          let cartProduct = JSON.parse(response);
          let productsArray = cartProduct.products.products;
              this.cartList = this.store.push( this.store.normalize('cart',cartProduct.cart));
              this.store.pushPayload({ products: productsArray });
              if(productsArray != undefined)
              {
              cartProduct.products.colors.map((col) => {
                    this.store.pushPayload({colors : col});
              })
            }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // let product = this.store.peekRecord('color', id);
    // product.deleteRecord();
    // product.save();
  }
}
