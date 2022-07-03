import headlinesReducer from '../../reducers/headlines-reducer';

describe('headlinesReducer', () => {

  const defaultState = {
    isLoading: false,
    headlines: [],
    error: null
  };

  test('should successfully return the default state if no action is passed into it', () => {
    expect(headlinesReducer(defaultState, {type: null })).toEqual(
      {
        isLoading: false,
        headlines: [],
        error: null
      }
    );
  });
});
