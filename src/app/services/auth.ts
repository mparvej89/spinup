import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.checkSession();
  }

  private checkSession() {
    const user = localStorage.getItem('earnings_user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  get currentUser() {
    return this.userSubject.value;
  }

  login(phone: string) {
    // Mock login - prepare for Firebase Auth
    const mockUser = {
      uid: 'user_' + Date.now(),
      phone: phone,
      name: 'User ' + phone.substring(0, 4)
    };
    this.userSubject.next(mockUser);
    localStorage.setItem('earnings_user', JSON.stringify(mockUser));
    return true;
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('earnings_user');
  }
}
