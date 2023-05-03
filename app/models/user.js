import Model from '@ember-data/model';
import { attr,hasMany } from '@ember-data/model';

export default class UserModel extends Model {

   @attr('string') userName;
   @attr('string') phoneNumber;
   @attr('string') emailId;
   @attr('string') password;

   @hasMany('sales-item') products;
}
