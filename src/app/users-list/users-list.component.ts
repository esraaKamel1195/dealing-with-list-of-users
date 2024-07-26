import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from './users.service';
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
  filteredUsers: Array<any> = [];
  searchedUser: any[] = [];
  length: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  totalLength: number = 0;
  pageSizeOptions: Array<number> = [5, 10, 15, 20, 25];
  showFirstLastButtons = true;
  loading: boolean = false;
  private usersSubscription?: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.getusersList();
  }

  getusersList(searchText?: string) {
    this.usersSubscription = this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.length = this.users.length;
        if (searchText) {
          this.searchedUser = this.users.filter((user) => {
            if (
              user.name.toLowerCase().includes(searchText.toLowerCase()) ||
              user.username.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return user;
            }
          });
        }
        this.loading = false;
        this.handleList();
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.handleList();
  }

  handleList() {
    if (this.searchedUser.length > 0) {
      this.filteredUsers = this.searchedUser.slice(
        this.pageIndex * this.pageSize,
        this.pageIndex * this.pageSize + this.pageSize
      );
    } else {
      this.filteredUsers = this.users.slice(
        this.pageIndex * this.pageSize,
        this.pageIndex * this.pageSize + this.pageSize
      );
    }
  }

  ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
  }
}
