import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../core/services/auth.service';
import { ServerService } from '../../shared/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less']
})

export class LoginComponent implements OnInit {

  authForm: any;
  isSubmitted = false;
  messages: any[] = [];
  loading: boolean = true;
  get formControls() { return this.authForm.controls; }

  constructor(
    private _as: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _ss: ServerService,
    private _ms: MessageService
  ) { }

  ngOnInit() {
    this.messages = [];
    let authToken = sessionStorage.getItem('AUTH_TOKEN');
    this._ms.clearMessage();
    if (authToken !== null) {
      this.loading = true;
      this._ss.getData(AppConfig.API_RESOURCE.LOGIN)
        .subscribe(
          resp => {
            if (resp.status === 'success') {
              this._as.authenticate(resp.data);
              let redirectUrl = this._as.getRedirectUrl() || '/mock-api';
              this._router.navigateByUrl(redirectUrl);
            } else {
              this.messages.push(resp.message);
              sessionStorage.removeItem('AUTH_TOKEN');
              sessionStorage.removeItem('USER');
            }
            this.loading = false;
          },
          error => {
            this.loading = false;
          }
        );
    } else {
      this.loading = false;
    }

    this.authForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    this.messages = [];
    this._ms.clearMessage();
    if (this.authForm.valid) {
      this.loading = true;
      let formData = this.authForm.getRawValue();
      this._ss.postData(AppConfig.API_RESOURCE.LOGIN, formData)
        .subscribe(
          resp => {
            if (resp.status === 'success') {
              this._as.authenticate(resp.data);
              let redirectUrl = this._as.getRedirectUrl() || '/mock-api';
              this._router.navigateByUrl(redirectUrl);
            } else {
              this.messages.push(resp.message);
            }
            this.loading = false;
            this.isSubmitted = false;
          },
          error => {
            this.isSubmitted = false;
            this.loading = false;
          }
        );
    }
  }

}