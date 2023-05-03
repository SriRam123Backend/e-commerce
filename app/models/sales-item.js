import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class SalesItemModel extends Model {

    @attr picImg;
    @attr name;
    @attr reelPrice;
    @attr realPrice;
    @attr stock;
    @attr quantity;
    @attr detail;
    @attr checkCart
}
