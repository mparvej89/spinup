import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ad } from '../services/ad';
import { Task, TaskItem } from '../services/task';
import { Wallet } from '../services/wallet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page implements OnInit, OnDestroy {
  coins = 0;
  remainingAds = 20;
  isWatchingAd = false;
  adError = '';
  
  tasks$ = this.taskService.tasks$;
  private sub = new Subscription();

  constructor(
    private adService: Ad,
    private taskService: Task,
    private wallet: Wallet
  ) {}

  ngOnInit() {
    this.remainingAds = this.adService.getRemainingAds();
    this.sub.add(this.wallet.coins$.subscribe(c => this.coins = c));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTaskIcon(type: string): string {
    switch (type) {
      case 'login': return 'calendar-check';
      case 'ad': return 'tv';
      case 'invite': return 'people';
      case 'spin': return 'aperture';
      default: return 'star';
    }
  }

  async watchAd() {
    this.isWatchingAd = true;
    this.adError = '';
    try {
      await this.adService.showRewardedAd();
      this.remainingAds = this.adService.getRemainingAds();
    } catch (e: any) {
      this.adError = e.message || 'Failed to play ad';
    } finally {
      this.isWatchingAd = false;
    }
  }

  completeTask(task: TaskItem) {
    if (!task.completed) {
      this.taskService.completeTask(task.id);
    }
  }
}
