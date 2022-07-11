import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-actions-panel',
  templateUrl: './users-actions-panel.component.html',
  styleUrls: ['./users-actions-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersActionsPanelComponent implements OnInit, OnDestroy {
  @Input() set isAllSelected(isAllSelected: boolean) {
    this.form.get('selectAll')?.setValue(isAllSelected, { emitEvent: false });
  }
  @Input() deleteDisabled!: boolean;
  @Input() canClear!: boolean;
  @Input() set canSelect(canSelect: boolean) {
    if (canSelect) {
      this.form.get('selectAll')?.enable();
    } else {
      this.form.get('selectAll')?.disable();
    }
  }
  @Input() canFilterBySelection!: boolean;
  @Output() emitSelectAll = new EventEmitter<boolean>();
  @Output() emitSearch = new EventEmitter<string>();
  @Output() emitClear = new EventEmitter<void>();

  form = new FormGroup({
    selectAll: new FormControl(false),
    search: new FormControl(''),
  });

  selectAllChanges = this.form.get('selectAll')!.valueChanges;
  searchChanges = this.form.get('search')!.valueChanges;
  unsubscribe = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.selectAllChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => this.emitSelectAll.emit(value!));
    this.searchChanges
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((value) => this.emitSearch.emit(value!));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  clear() {
    this.emitClear.emit();
  }

  filterBySelection() {}
}
