import { Component, OnInit } from '@angular/core';
import { Referral } from '../../services/referral';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
  standalone: false
})
export class ReferralPage implements OnInit {
  myCode = '';
  friendCode = '';

  constructor(private referral: Referral, private auth: Auth) { }

  ngOnInit() {
    const user = this.auth.currentUser || { uid: 'guest_123' };
    this.myCode = this.referral.generateCode(user.uid);
  }

  copyCode() {
    navigator.clipboard.writeText(this.myCode).then(() => {
      alert('Referral code copied to clipboard!');
    });
  }

  applyCode() {
    if (this.referral.applyReferralCode(this.friendCode)) {
      alert('Referral code applied successfully! You earned 200 coins.');
      this.friendCode = '';
    } else {
      alert('Invalid referral code.');
    }
  }
}
