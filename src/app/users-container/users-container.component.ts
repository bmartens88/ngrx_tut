import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UsersStoreService } from './users-store.service';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersStoreService],
})
export class UsersContainerComponent implements OnInit {
  deleteDisabled$ = this.store.deleteDisabled$;
  isAllSelected$ = this.store.isAllSelected$;
  canClear$ = this.store.canClear$;
  canSelect$ = this.store.canSelect$;
  canFilterBySelection$ = this.store.canFilterBySelection$;
  selectAll$ = this.store.selectAll$;
  users$ = this.store.filteredUsers$;

  constructor(private store: UsersStoreService) {}

  ngOnInit(): void {
    this.store.setState({
      users: [
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'Maria', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'Maria', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'Maria', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'Caroline', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'Caroline', surname: 'Doe', email: 'doe@acme.com' },
        { name: 'John', surname: 'Doe', email: 'doe@acme.com' },
      ],
      selectAll: { checked: false },
      selectedUsers: [],
      searchTerm: '',
    });
  }

  handleSelectAll(selectAll: boolean) {
    console.log('selectAll: ', selectAll);
    this.store.updateSelectAll(selectAll);
  }

  handleSelectedUsers(selectedUsers: User[]) {
    this.store.updateSelectedUsers(selectedUsers);
  }

  handleSearch(searchTerm: string) {
    this.store.updateSearchTerm(searchTerm);
  }

  handleClear() {
    this.store.clear();
  }
}
