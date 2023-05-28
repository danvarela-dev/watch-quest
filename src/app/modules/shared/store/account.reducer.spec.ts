import { Action } from '@ngrx/store';
import { accountReducer, initialState } from './account.reducer';

describe('Account Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = accountReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
