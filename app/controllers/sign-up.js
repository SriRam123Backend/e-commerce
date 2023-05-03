import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignupController extends Controller {
  @service store;
  @service router;

  @action
  userNameValidator() {
    // var userName = this.allusers.allUsersDetails.contains($('#username').val())
    // console.log(userName);
    if (/^[a-zA-Z\s]{3,20}$/.test($('#username').val())) {
      $('#userNameErrorMessage').hide();
      return true;
    } else {
      $('#userNameErrorMessage').show();
      return false;
    }
  }
  @action
  emailValidator() {
    if (
      /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test($('#email').val())
    ) {
      $('#emailErrorMessage').hide();
      return true;
    } else {
      $('#emailErrorMessage').show();
      return false;
    }
  }
  @action
  passwordValidator() {
    if (
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,20}$/.test(
        $('#password').val()
      )
    ) {
      $('#passwordErrorMessage').hide();
      return true;
    } else {
      $('#passwordErrorMessage').show();
      return false;
    }
  }
  @action
  sendData() {
    if (
      this.userNameValidator() &&
      this.emailValidator() &&
      this.passwordValidator()
    ) {
      let date = new Date($('#dob').val());
      console.log(date);
      let user = {
        userName: $('#username').val(),
        emailId: $('#email').val(),
        dob: date,
        password: $('#password').val(),
      };
      $.ajax({
        method: 'POST',
        url: '/e_commerce/signUp',
        data: JSON.stringify(user),
        contentType: 'application/json',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then((response, textStatus, xhr) => {
          let userData = JSON.parse(response);
          let userdatum = JSON.parse(userData.user);
          this.store.pushPayload({ user: userdatum });
          if (xhr.status === 201 && textStatus === 'success') {
            this.router.transitionTo('product-page');
          }
        })
        .catch((error) => {
          alert('Sign Up failed');
        });
    } else {
      alert('Please enter the Details correctly');
    }
  }
}
