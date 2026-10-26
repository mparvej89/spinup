import { Component, OnInit, OnDestroy } from '@angular/core';
import { Wallet } from '../services/wallet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page implements OnInit, OnDestroy {
  coins = 0;
  money = 0;
  transactions$ = this.wallet.transactions$;

  private sub = new Subscription();

  constructor(private wallet: Wallet) {}

  ngOnInit() {
    this.sub.add(
      this.wallet.coins$.subscribe(c => {
        this.coins = c;
        this.money = this.wallet.money;
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
