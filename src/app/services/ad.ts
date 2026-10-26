import { Injectable } from '@angular/core';
import { Wallet } from './wallet';

@Injectable({
  providedIn: 'root'
})
export class Ad {

  constructor(private wallet: Wallet) { }

  private lastAdWatchedTime = 0;
  private adsWatchedToday = 0;
  private maxAdsPerDay = 20;

  async showRewardedAd(): Promise<boolean> {
    // Mock implementation for AdMob Rewarded Ad
    const now = Date.now();
    
    // Cooldown check: 30 seconds
    if (now - this.lastAdWatchedTime < 30000) {
      const waitTime = Math.ceil((30000 - (now - this.lastAdWatchedTime)) / 1000);
      throw new Error(`Please wait ${waitTime} seconds before watching the next ad.`);
    }

    if (this.adsWatchedToday >= this.maxAdsPerDay) {
        throw new Error('Daily ad limit reached. Come back tomorrow!');
    }

    // Simulate ad viewing delay (e.g., watching a 5 second video mock)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success scenario
    this.lastAdWatchedTime = Date.now();
    this.adsWatchedToday++;
    
    // Reward user (e.g. 50 coins per ad)
    this.wallet.addCoins(50, 'Watched Rewarded Ad');
    
    return true;
  }
  
  getRemainingAds(): number {
      return this.maxAdsPerDay - this.adsWatchedToday;
  }
}
