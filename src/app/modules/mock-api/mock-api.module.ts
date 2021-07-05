import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MockAPIComponent } from './mock-api.component';
import { APIlistComponent } from './components/api-list/api-list.component';
import { MockAPIRoutingModule } from './mock-api-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddAPIComponent } from './components/add-api/add-api.component';
import { AddProjectComponent } from './modal/add-project/add-project.component';
import { CommonErrorComponent } from './modal/common-error/common-error.component';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    MockAPIComponent,
    APIlistComponent,
    AddAPIComponent,
    AddProjectComponent,
    CommonErrorComponent
  ],
  imports: [
    SharedModule,
    MockAPIRoutingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    ProjectService
  ],
})
export class MockAPIModule { }
