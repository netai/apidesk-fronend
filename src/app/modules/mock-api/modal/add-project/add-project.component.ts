import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AppConfig } from '../../../../app.config';
import { MessageService } from '../../../../shared/services/message.service';
import { ServerService } from '../../../../shared/services/server.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.less']
})
export class AddProjectComponent implements OnInit {

  loading = true;
  isSubmitted = false;
  projectForm: any;
  onClose: any;
  get formControls() { return this.projectForm.controls; }

  constructor(
    public bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _ss: ServerService,
    private _ms: MessageService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.loading = false;
    this.projectForm = this._fb.group({
      project_name: ['', Validators.required],
    });
  }

  public save() {
    this.isSubmitted = true;
    this._ms.clearMessage();
    if (this.projectForm.valid) {
      this.loading = true;
      let formData = this.projectForm.getRawValue();
      this._ss.postData(AppConfig.API_RESOURCE.ADD_PROJECT, formData)
        .subscribe(
          resp => {
            if (resp.status === 'success') {
              this._ms.addMessage({ message: resp.message, title: 'Successfull', type: 'success' });
              this.onClose.next('close');
              this.bsModalRef.hide();
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

}
