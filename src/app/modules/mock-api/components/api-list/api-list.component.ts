import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServerService } from '../../../../shared/services/server.service';
import { AppConfig } from '../../../../app.config';
import { AddProjectComponent } from '../../modal/add-project/add-project.component';
import { CommonErrorComponent } from '../../modal/common-error/common-error.component';
import { MessageService } from '../../../../shared/services/message.service';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../../../models/project.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.less']
})
export class APIlistComponent implements OnInit {

  loading = true;
  mockAPIbaseUrl = '';
  activeProjectTab = '';
  bsModalRef: any;
  userDetail: any;
  projectList: ProjectModel[] = [];

  constructor(
    private _modalService: BsModalService,
    private _ss: ServerService,
    private _ms: MessageService,
    private _ps: ProjectService,
    private _as: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.mockAPIbaseUrl = AppConfig.MOCK_API_BASE_URL;
    this.userDetail = this._as.getUserData().user;
    console.log(this.userDetail);
    this._getProjects();
  }

  public changeTab(tab: string) {
    this.activeProjectTab = tab;
  }

  public openAddProject() {
    const modalConfig = {
      animated: true,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'add-project-modal',
      initialState: {}
    };
    this.bsModalRef = this._modalService.show(AddProjectComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe((result: any) => {
      console.log('results', result);
      this._getProjects();
    })
  }

  public openCommonError() {
    const modalConfig = {
      animated: true,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg common-error-modal',
      initialState: {}
    };
    this.bsModalRef = this._modalService.show(CommonErrorComponent, modalConfig);
  }

  private _getProjects() {
    this._ms.clearMessage();
    this.loading = true;
    this._ss.getData(AppConfig.API_RESOURCE.GET_PROJECT)
      .subscribe(
        resp => {
          if (resp.status === 'success') {
            this._ps.setProjectList(resp.data.projects);
            this.projectList = this._ps.getProojectList();
            if (this.projectList.length > 0) {
              this.activeProjectTab = 'project-tab-' + this.projectList[0].id;
            }
          } else {
            this._ms.addMessage({ message: resp.message, title: 'Error', type: 'error' });
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }

  ngAfterViewInit(): void {
    document.getElementsByTagName("body")[0].classList.add("long-page");
  }

  ngOnDestroy(): void {
    document.getElementsByTagName("body")[0].classList.remove("long-page");
  }

}
