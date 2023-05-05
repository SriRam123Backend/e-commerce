import Model, { attr, hasMany } from '@ember-data/model';

export default class CartModel extends Model {

  @hasMany('color') colors;
  @hasMany('product') products;
  @attr userId;
}
