import * as c from './ActionTypes';

export const requestHeadlines = () => ({
  type: c.REQUEST_HEADLINES
});

export const getHeadlinesSuccess = (headlines) => ({
  type: c.GET_HEADLINES_SUCCESS,
  headlines
});

export const getHeadlinesFailure = (error) => ({
  type: c.GET_HEADLINES_FAILURE,
  error
});

// Instead of using setState() to alter a component's local state, we are dispatching actions which will update our Redux store.

export const makeApiCall = () => { //n order to use Redux Thunk, an asynchronous action needs to return an inner function. This inner (anonymous) function can take two parameters: the store's dispatch and getState methods.
  return dispatch => {
    dispatch(requestHeadlines); // we are dispatching actions instead of updating local state. Before we make our API call, we'll need to dispatch the REQUEST_HEADLINES action. Note that we have our handy requestHeadlines action creator to make our code a little cleaner. This will update the store's state so isLoading is set to true.
    return fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`) //Next, we use fetch() to make our API call. 
      .then(response => response.json()) // If the call is successful, we dispatch another action. The getHeadlinesSuccess() action creator takes the response's results as an argument. These are the daily headlines which we want to pass as a payload into the GET_HEADLINES_SUCCESS action.
      .then(  // When this action is triggered, our store will be updated: isLoading will be set to false and headlines will be updated to the response's payload.
        (jsonifiedResponse) => {
          dispatch(getHeadlinesSuccess(jsonifiedResponse.results));
        })
      .catch((error) => { // If there's an error, a different action will be dispatched.
        dispatch(getHeadlinesFailure(error)); // The getHeadlinesFailure() action creator will trigger the GET_HEADLINES_FAILURE action - and pass the error from the API response along to the Redux store.
      });
  }
}

//That's all there is to an asynchronous action handled by Redux Thunk. It's a function that returns another function. That function takes up to two parameters - dispatch and getState. We can then dispatch pure reducer actions as needed within our async action - or even access the state of the store with getState.

