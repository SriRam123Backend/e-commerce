import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserModel extends Model {
  @attr userName;
  @attr password;
  @attr emailId;
  @attr dateOfBirth;
}
