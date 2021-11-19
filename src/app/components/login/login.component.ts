import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import sendRequest from '../../../assets/js/requester';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error = null;
  refresh_token = '';
  access_token = '';

  constructor() {}

  loginForm: any = {
    login: 'demo_68f3js1@bibinet.ru',
    password: 'MJJ3Cb',
  };
  ngOnInit(): void {
    this.access_token = localStorage.getItem('access_token') || '';
    this.refresh_token = localStorage.getItem('refresh_token') || '';
  }

  requestAuthorization() {
    const body = {
      data: {
        login: this.loginForm.login,
        password: this.loginForm.password,
      },
    };

    sendRequest('POST', '/accounts/login/', body)
      .then((data) => {
        if (data.response) {
          localStorage.setItem('access_token', data.response.access_token);
          localStorage.setItem('refresh_token', data.response.refresh_token);
          window.location.reload();
        } else {
          this.error = data.field_errors.login[0];
          setTimeout(() => (this.error = null), 3000);
        }
      })
      .catch((err) => (this.error = err));
  }

  logining() {
    this.requestAuthorization();
  }

  stopPropagationHandler(event: any) {
    event.stopPropagation();
  }

  @Output() onChanged = new EventEmitter<boolean>();
  async hideDialog() {
    this.onChanged.emit(false);
  }
}
