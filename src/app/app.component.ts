import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, FormsModule, MatInputModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  startKm?: number;
  speed?: number;
  currentKm?: number;

  running = false;
  private readonly period = 50;

  start(): void {
    if(!this.startKm || !this.speed) {
      return;
    }

    this.running = true;

    interval(this.period)
      .pipe(takeWhile(() => this.running))
    .subscribe(i => this.currentKm = this.startKm! + i * this.period / 1000 / 60 / 60 * this.speed!);
  }

  stop(): void {
    this.running = false;
    this.currentKm = undefined;
  }
}
