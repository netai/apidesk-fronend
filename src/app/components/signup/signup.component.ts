import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { AppConfig } from '../../app.config';
import { ServerService } from '../../shared/services/server.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.less']
})

export class SignupComponent implements OnInit {

  signupForm: any;
  isSubmitted = false;
  messages: any[] = [];
  loading: boolean = true;
  isSignupSuccess: boolean = false;
  get formControls() { return this.signupForm.controls; }

  constructor(
    private _fb: FormBuilder,
    private _ss: ServerService,
    private _ms: MessageService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.signupForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
    }, {
      validator: this._aditionalValidators
    });
  }

  private _aditionalValidators(c: any): any {
    if (c.get('password').value !== c.get('cpassword').value) {
      return { invalid: true };
    }
    return ;
  }

  public signup(): void {
    this.isSubmitted = true;
    this.messages = [];
    this._ms.clearMessage();
    if (this.signupForm.valid) {
      this.loading = true;
      let formData = this.signupForm.getRawValue();
      this._ss.postData(AppConfig.API_RESOURCE.SIGNUP, formData)
        .subscribe(
          resp => {
            if (resp.status === 'success') {
              this.isSignupSuccess = true;
            } else {
              this.messages.push(resp.message);
            }
            this.loading = false;
            this.isSubmitted = true;
          },
          error => {
            this.loading = false;
            this.isSubmitted = true;
          }
        );
    }
  }

}