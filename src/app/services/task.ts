import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wallet } from './wallet';

export interface TaskItem {
    id: string;
    title: string;
    reward: number;
    completed: boolean;
    type: 'login' | 'ad' | 'invite' | 'spin';
}

@Injectable({
  providedIn: 'root'
})
export class Task {

  private tasksSubject = new BehaviorSubject<TaskItem[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private wallet: Wallet) {
      this.initializeTasks();
  }

  private initializeTasks() {
      // In a real app, this comes from a backend and resets every day at 12 AM.
      const dailyTasks: TaskItem[] = [
          { id: 't1', title: 'Daily Login', reward: 20, completed: false, type: 'login' },
          { id: 't2', title: 'Watch 5 Ads', reward: 100, completed: false, type: 'ad' },
          { id: 't3', title: 'Invite a Friend', reward: 500, completed: false, type: 'invite' },
          { id: 't4', title: 'Spin the Wheel', reward: 30, completed: false, type: 'spin' }
      ];
      
      const savedTasks = localStorage.getItem('earnings_tasks');
      const lastResetDate = localStorage.getItem('earnings_task_date');
      const currentDate = new Date().toDateString();

      if (savedTasks && lastResetDate === currentDate) {
          this.tasksSubject.next(JSON.parse(savedTasks));
      } else {
          // Reset tasks for the new day
          this.tasksSubject.next(dailyTasks);
          localStorage.setItem('earnings_task_date', currentDate);
      }
  }

  completeTask(taskId: string) {
      const tasks = this.tasksSubject.value;
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex !== -1 && !tasks[taskIndex].completed) {
          tasks[taskIndex].completed = true;
          this.wallet.addCoins(tasks[taskIndex].reward, `Completed task: ${tasks[taskIndex].title}`);
          this.tasksSubject.next([...tasks]);
          localStorage.setItem('earnings_tasks', JSON.stringify(tasks));
          return true;
      }
      return false;
  }
}
