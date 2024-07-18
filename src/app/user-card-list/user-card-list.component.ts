import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card-list',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatCardModule, RouterModule ],
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.scss',
})
export class UserCardListComponent {
  @Input({ required: true }) users: any;


}
