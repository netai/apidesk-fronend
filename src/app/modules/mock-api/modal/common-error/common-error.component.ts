import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-common-error',
  templateUrl: './common-error.component.html',
  styleUrls: ['./common-error.component.less']
})
export class CommonErrorComponent implements OnInit {

  loading = true;

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.loading = false;
  }

  public save() {

  }

}
