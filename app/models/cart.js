import Model, { attr, hasMany } from '@ember-data/model';

export default class CartModel extends Model {

  @hasMany('product') products;
  @attr userId;
}
