import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-oauth',
  standalone: true,
  imports: [],
  templateUrl: './login-oauth.component.html',
  styleUrl: './login-oauth.component.scss'
})
export class LoginOAuthComponent {
  private tokenCheckInterval: any;
  constructor(private router: Router) {
    // Start checking for the token value periodically
    this.startTokenCheck();
  }

  startTokenCheck(): void {
    this.tokenCheckInterval = setInterval(() => {
      this.checkAndRedirect();
    }, 1000); // Adjust the interval as needed
  }

  checkAndRedirect(): void {
    const specificValue = sessionStorage.getItem('loggedInUser');
    if (specificValue) {
      clearInterval(this.tokenCheckInterval);
      this.router.navigate(['/home']); 
    }
  }


}
