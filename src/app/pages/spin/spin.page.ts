import { Component, OnInit } from '@angular/core';
import { Wallet } from '../../services/wallet';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.page.html',
  styleUrls: ['./spin.page.scss'],
  standalone: false
})
export class SpinPage implements OnInit {
  rewards = [10, 50, 0, 100, 20, 5, 200, 0];
  isSpinning = false;
  currentRotation = 0;
  spinsLeft = 3;

  constructor(private wallet: Wallet) { }

  ngOnInit() {
    const savedDate = localStorage.getItem('earnings_spin_date');
    const today = new Date().toDateString();
    
    if (savedDate !== today) {
      this.spinsLeft = 3;
      localStorage.setItem('earnings_spin_date', today);
    } else {
      const savedSpins = localStorage.getItem('earnings_spins_left');
      if (savedSpins) this.spinsLeft = parseInt(savedSpins, 10);
    }
  }

  spinWheel() {
    if (this.spinsLeft <= 0 || this.isSpinning) return;
    
    this.isSpinning = true;
    this.spinsLeft--;
    localStorage.setItem('earnings_spins_left', this.spinsLeft.toString());

    // Calculate rotation
    const sliceAngle = 360 / this.rewards.length;
    const randomIndex = Math.floor(Math.random() * this.rewards.length);
    
    // Spin 5 extra full rotations + stop at random index
    const extraRotations = 5 * 360;
    const targetRotation = extraRotations + (360 - (randomIndex * sliceAngle));
    
    this.currentRotation += targetRotation;

    setTimeout(() => {
      this.isSpinning = false;
      const wonAmount = this.rewards[randomIndex];
      
      if (wonAmount > 0) {
        this.wallet.addCoins(wonAmount, 'Won from Daily Spin');
        alert(`Congratulations! You won ${wonAmount} coins!`);
      } else {
        alert('Oops! Better luck next time.');
      }
    }, 3000);
  }
}
