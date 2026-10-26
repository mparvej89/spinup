import { Injectable } from '@angular/core';
import { Wallet } from './wallet';

@Injectable({
  providedIn: 'root'
})
export class Referral {

  constructor(private wallet: Wallet) { }

  generateCode(userId: string): string {
    // Generate a simple 6 char alphanumeric code
    return 'REF' + userId.substring(userId.length - 3).toUpperCase() + Math.floor(100 + Math.random() * 900);
  }

  applyReferralCode(code: string): boolean {
    // Basic mock validation
    if (code && code.length > 5) {
      // Reward user for applying code (e.g. 200 coins)
      this.wallet.addCoins(200, 'Applied Referral Code: ' + code);
      return true;
    }
    return false;
  }
}
