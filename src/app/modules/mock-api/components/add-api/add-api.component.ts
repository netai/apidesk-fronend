import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../../../shared/services/message.service';
import { ServerService } from '../../../../shared/services/server.service';
import { AppConfig } from '../../../../app.config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.less']
})
export class AddAPIComponent implements OnInit {

  loading = true;
  mockAPIbaseUrl = '';
  activeResponseTab = 'response-tab1';
  isSubmitted = false;
  APIFrom: any;
  project_id = '';
  get formControls() { return this.APIFrom.controls; }

  constructor(
    private _fb: FormBuilder,
    private _ss: ServerService,
    private _ms: MessageService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.project_id = this._route.snapshot.params.project_id;
    console.log(this.project_id)
    this.loading = false;
    this.mockAPIbaseUrl = AppConfig.MOCK_API_BASE_URL;
    this.APIFrom = this._fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      method: ['GET', Validators.required],
      input_json: ['', Validators.required],
      auth_require: [false],
      success_json: ['', Validators.required],
      failed_json: ['', Validators.required],
    });
  }

  public save() {
    this.isSubmitted = true;
    this._ms.clearMessage();
    if (this.APIFrom.valid) {
      this.loading = true;
      let formData = this.APIFrom.getRawValue();
      let url = AppConfig.API_RESOURCE.ADD_API.replace('<PROJECT-ID>', this.project_id);
      this._ss.postData(url, formData)
        .subscribe(
          resp => {
            if (resp.status === 'success') {
              this._ms.addMessage({ message: resp.message, title: 'Successfull', type: 'success' });
              this._router.navigateByUrl('/mock-api');
            } else {
              this._ms.addMessage({ message: resp.message, title: 'Error', type: 'error' });
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

  public onCheckboxChange(evt: any, key: any) {
    this.APIFrom.patchValue({
      key: evt.target.checked
    });
  }

  public changeTab(tab: string) {
    this.activeResponseTab = tab;
  }

  ngAfterViewInit(): void {
    document.getElementsByTagName("body")[0].classList.add("long-page");
  }

  ngOnDestroy(): void {
    document.getElementsByTagName("body")[0].classList.remove("long-page");
  }

}
