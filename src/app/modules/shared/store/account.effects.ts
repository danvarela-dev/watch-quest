import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AccountService } from '../services/account/account.service';
import { AccountActions } from './account.actions';

@Injectable()
export class AccountEffects {
  loadAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.loadAccount),
      mergeMap(() =>
        this.accountService
          .getAccount()
          .pipe(
            map((user) =>
              AccountActions.loadAccountsSuccess({ data: { user } })
            )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}
}
