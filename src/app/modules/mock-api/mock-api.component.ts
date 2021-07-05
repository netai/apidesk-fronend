import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mock-api',
  templateUrl: './mock-api.component.html',
  styleUrls: ['./mock-api.component.less']
})
export class MockAPIComponent implements OnInit {

  loading: boolean = true;

  constructor() {
    this.loading = false;
  }

  ngOnInit(): void {
  }

}
