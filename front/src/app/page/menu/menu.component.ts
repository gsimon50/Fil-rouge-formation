import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { time } from 'console';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit(): void {
    setTimeout(() => {
        if (typeof window !== 'undefined' && localStorage) {
          this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        }
    }, 1000);
  }
}
