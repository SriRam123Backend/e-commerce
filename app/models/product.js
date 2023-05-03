import Model, { attr, belongsTo } from '@ember-data/model';

export default class ProductModel extends Model {
  @belongsTo('cart') cart;
  @attr name;
  @attr description;
  @attr price;
  @attr features;
  @attr colors;
}
