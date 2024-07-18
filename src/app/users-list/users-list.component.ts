import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../users.service';
import { UserCardListComponent } from '../user-card-list/user-card-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule,
    UserCardListComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: Array<any> = [];
  length: number = 0;
  pageSize: number = 0;
  pageIndex: number = 0;
  pageSizeOptions: Array<number> = [5, 10];
  showFirstLastButtons = true;
  loading: boolean = false;
  private usersSubscription?: Subscription;
  // @ViewChild('addItem', { static: true }) addItem?: ElementRef;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.usersSubscription = this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.length = this.users.length;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
  }
}
