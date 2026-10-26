import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Wallet } from '../services/wallet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit, OnDestroy {
  coins = 0;
  money = 0;
  private sub: Subscription = new Subscription();

  constructor(private wallet: Wallet, private router: Router) {}

  ngOnInit() {
    this.sub = this.wallet.coins$.subscribe(c => {
      this.coins = c;
      this.money = this.wallet.money;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  goToTasks() {
    this.router.navigate(['/tabs/tab2']);
  }
}
