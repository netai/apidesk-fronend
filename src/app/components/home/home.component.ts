import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;

  constructor(private _as: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this._as.isLoggedIn();
  }

}
