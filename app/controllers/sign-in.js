import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignInController extends Controller {
  @service router;
  @service store;

  @action
  login() {
    let user = {};
    user.userName = $('#username').val();
    user.password = $('#password').val();
    $.ajax({
      method: 'POST',
      url: '/e_commerce/signIn',
      data: JSON.stringify(user),
      contentType: 'application/json',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response, textStatus, xhr) => {
        console.log(xhr.status);
        console.log(textStatus);
        if (xhr.status === 201 && textStatus === 'success') {
          let userData = JSON.parse(response);
          let userdatum = JSON.parse(userData.user);
          this.store.pushPayload({ user: userdatum });
          this.router.transitionTo('product-page');
        }
      })
      .catch((error) => {
        alert('Login failed');
      });
  }
}
