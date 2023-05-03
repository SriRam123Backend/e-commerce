import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UsernamePasswordFieldsComponent extends Component {
  @action
  showPassword() {
    // document.getElementById("password").type == 'password' ? document.getElementById("password").type = 'text' : document.getElementById("password").type = 'password';
    $('#password').attr('type') == 'password'
      ? $('#password').attr('type', 'text')
      : $('#password').attr('type', 'password');
  }
}
