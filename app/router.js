import EmberRouter from '@ember/routing/router';
import config from 'e-commerce/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('cart', { path: '/shopping-cart' });
  this.route('item', { path: '/item/:item_id' });
  this.route('sign-up');
  this.route('sign-in');
  this.route('product-page');
});
