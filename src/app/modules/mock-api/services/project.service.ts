import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _projectList: ProjectModel[] = [];

  constructor() { }

  public setProjectList(projectList: any): void {
      this._projectList = projectList;
  }

  public getProojectList(): ProjectModel[] {
      return this._projectList;
  }
}
