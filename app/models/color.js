import Model, { attr, belongsTo } from '@ember-data/model';

export default class ColorModel extends Model {
  @belongsTo('product') product;
  @belongsTo('cart') cart;
  @attr color;
  @attr image;
}
