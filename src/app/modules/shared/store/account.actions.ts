import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account } from '../interfaces/account.interface';

export const AccountActions = createActionGroup({
  source: 'Account',
  events: {
    'Load Account': emptyProps(),
    'Load Accounts Success': props<{ data: { user: Account } }>(),
  },
});
