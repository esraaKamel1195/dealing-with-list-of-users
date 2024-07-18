import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: any = {};
  private userSubscription?: Subscription;
  id: number = 0;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });

    this.userSubscription = this.usersService.getUserById(this.id).subscribe({
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
