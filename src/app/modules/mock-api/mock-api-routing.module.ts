import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAPIComponent } from './components/add-api/add-api.component';
import { APIlistComponent } from './components/api-list/api-list.component';
import { MockAPIComponent } from './mock-api.component'; 

const routes: Routes = [
    {
        path: '',
        component: MockAPIComponent,
        children: [
            {path: '', component: APIlistComponent},
            {path: ':project_id/add-api', component: AddAPIComponent},
            {path: 'edit-api/:apiId', component: AddAPIComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MockAPIRoutingModule { }