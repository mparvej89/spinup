import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Wallet {
  private coinsSubject = new BehaviorSubject<number>(0);
  coins$ = this.coinsSubject.asObservable();
  
  private transactionsSubject = new BehaviorSubject<any[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor() {
    this.loadBalances();
  }

  private loadBalances() {
    const savedCoins = localStorage.getItem('earnings_coins');
    if (savedCoins) {
      this.coinsSubject.next(parseInt(savedCoins, 10));
    }
    const savedTx = localStorage.getItem('earnings_tx');
    if (savedTx) {
      this.transactionsSubject.next(JSON.parse(savedTx));
    }
  }

  get coins() {
    return this.coinsSubject.value;
  }

  get money() {
    return this.coins / 100; // 100 coins = ₹1
  }

  addCoins(amount: number, description: string) {
    const newBalance = this.coins + amount;
    this.coinsSubject.next(newBalance);
    localStorage.setItem('earnings_coins', newBalance.toString());
    
    this.addTransaction({
      id: Date.now(),
      type: 'credit',
      amount,
      description,
      date: new Date().toISOString()
    });
  }

  deductCoins(amount: number, description: string): boolean {
    if (this.coins < amount) return false;
    
    const newBalance = this.coins - amount;
    this.coinsSubject.next(newBalance);
    localStorage.setItem('earnings_coins', newBalance.toString());
    
    this.addTransaction({
      id: Date.now(),
      type: 'debit',
      amount,
      description,
      date: new Date().toISOString()
    });
    return true;
  }

  private addTransaction(tx: any) {
    const currentTx = [tx, ...this.transactionsSubject.value];
    this.transactionsSubject.next(currentTx);
    localStorage.setItem('earnings_tx', JSON.stringify(currentTx));
  }
}
