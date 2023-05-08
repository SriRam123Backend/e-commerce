import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ApplicationRoute extends Route {
  @service store;
  @service router;
  @service cart;

  async beforeModel() {
    return $.ajax({
      method: 'POST',
      url: '/e_commerce/cookie',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response, textStatus, xhr) => {
        if (xhr.status === 202 && textStatus === 'success') {
          let userData = JSON.parse(response);
          let userdatum = JSON.parse(userData.user);
          this.store.pushPayload({
            user: userdatum,
          });
          this.cart.currentcustomer = userdatum;
          if(this._router.url == '/sign-in' || this._router.url == '/sign-up' || this._router.url == '/')
          {
            this.router.transitionTo('product-page');
          }
        }
      })
      .catch((error) => {
        this.router.transitionTo('index');
      });
  }
}
