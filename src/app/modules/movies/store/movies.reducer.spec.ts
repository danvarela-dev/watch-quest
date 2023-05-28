import { moviesReducer, initialState } from './movies.reducer';

describe('Movies Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = moviesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
