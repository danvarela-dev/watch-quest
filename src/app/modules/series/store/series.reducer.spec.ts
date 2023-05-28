import { seriesReducer, initialState } from './series.reducer';

describe('Series Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = seriesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
