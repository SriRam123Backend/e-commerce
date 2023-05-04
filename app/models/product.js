import Model, { attr, belongsTo ,hasMany} from '@ember-data/model';

export default class ProductModel extends Model {
  @belongsTo('cart') cart;
  @attr name;
  @attr description;
  @attr price;
  @attr features;
  @hasMany('color') colors;
}
