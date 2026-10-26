import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wallet } from '../../services/wallet';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
  standalone: false
})
export class WithdrawPage implements OnInit {
  money = 0;
  upiId = '';
  amount: number | null = null;
  error = '';

  constructor(private wallet: Wallet, private router: Router) { }

  ngOnInit() {
    this.wallet.coins$.subscribe(() => {
      this.money = this.wallet.money;
    });
  }

  requestWithdrawal() {
    this.error = '';
    
    if (!this.amount || this.amount < 100) {
      this.error = 'Minimum withdrawal amount is ₹100.';
      return;
    }

    if (this.amount > this.money) {
      this.error = 'Insufficient funds.';
      return;
    }

    if (!this.upiId || !this.upiId.includes('@')) {
      this.error = 'Please enter a valid UPI ID.';
      return;
    }

    // Process withdrawal
    const coinsToDeduct = this.amount * 100;
    const success = this.wallet.deductCoins(coinsToDeduct, `Withdrawal to ${this.upiId}`);
    
    if (success) {
      alert(`Withdrawal request for ₹${this.amount} submitted successfully!`);
      this.router.navigate(['/tabs/tab3']);
    } else {
      this.error = 'Transaction failed. Please try again.';
    }
  }
}
