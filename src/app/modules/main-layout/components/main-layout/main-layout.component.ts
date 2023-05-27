import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeLast, takeUntil } from 'rxjs';
import { Account } from 'src/app/modules/shared/interfaces/account.interface';
import { AccountActions } from 'src/app/modules/shared/store/account.actions';
import { selectAccountState } from 'src/app/modules/shared/store/account.selectors';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  account$: Observable<Account>;
  unsubcribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AccountActions.loadAccount());
    this.account$ = this.store.select(selectAccountState);
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
