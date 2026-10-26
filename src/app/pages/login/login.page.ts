import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  authSegment = 'phone';
  phone = '';
  email = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    const identifier = this.authSegment === 'phone' ? this.phone : this.email;
    if (this.authService.login(identifier)) {
      this.router.navigate(['/tabs/tab1']);
    }
  }
}
