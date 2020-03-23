import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
      this.tokenService.clearToken();
      this.authService.clearTokenInfo();
      this.router.navigateByUrl('/open-pages/login').then();
  }

}
