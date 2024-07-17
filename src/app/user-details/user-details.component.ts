import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: any = {};
  private userSubscription?: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.userSubscription = this.usersService.getUserById(1).subscribe({
      next: (user) => {
        console.log('user', user);
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
