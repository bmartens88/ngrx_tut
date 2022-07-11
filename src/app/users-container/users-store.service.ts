import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';

export interface User {
  name: string;
  surname: string;
  email: string;
}

export interface UserState {
  users: User[];
  selectAll: { checked: boolean };
  selectedUsers: User[];
  searchTerm: string;
}

@Injectable()
export class UsersStoreService extends ComponentStore<UserState> {
  // state selector(s)
  users$: Observable<User[]> = this.select((state) => state.users);
  selectAll$: Observable<{ checked: boolean }> = this.select(
    (state) => state.selectAll
  );
  selectedUsers$: Observable<User[]> = this.select(
    (state) => state.selectedUsers
  );
  searchTerm$: Observable<string> = this.select((state) => state.searchTerm);

  // combine selector(s)
  deleteDisabled$: Observable<boolean> = this.select(
    this.selectedUsers$,
    (selectedUsers) => !!selectedUsers && !selectedUsers.length
  );

  filteredUsers$: Observable<User[]> = this.select(
    this.users$,
    this.searchTerm$,
    (users, searchTerm) => {
      if (!searchTerm.length) return users;
      else
        return users.filter((u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
  );

  isAllSelected$: Observable<boolean> = this.select(
    this.filteredUsers$,
    this.selectedUsers$,
    (filtered, selected) =>
      !!filtered.length && filtered.length === selected.length
  );

  canClear$: Observable<boolean> = this.select(
    this.selectedUsers$,
    this.isAllSelected$,
    (selected, isAllSelected) => !!selected.length && !isAllSelected
  );

  canSelect$: Observable<boolean> = this.select(
    this.filteredUsers$,
    (filtered) => !!filtered.length
  );

  canFilterBySelection$: Observable<boolean> = of(true);

  constructor() {
    super();
  }

  // updater(s)
  updateSelectAll(checked: boolean) {
    this.patchState({ selectAll: { checked } });
  }

  updateSelectedUsers(selectedUsers: User[]) {
    this.patchState({ selectedUsers });
  }

  updateSearchTerm(searchTerm: string) {
    this.patchState({ searchTerm });
  }

  clear() {
    this.patchState({ selectAll: { checked: false }, selectedUsers: [] });
  }

  // effect(s)
}
