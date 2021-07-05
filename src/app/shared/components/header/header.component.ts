import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private _as: AuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = this._as.isLoggedIn();
  }

  public logout(): void {
    this._as.logout();
      this._router.navigateByUrl('/');
  }

}
