import React from 'react';
// We need to import connect from React Redux. This will allow us to wrap our component with an HOC that provides Redux functionality such as the dispatch() function.
import { connect } from 'react-redux';
// We also need to import our ApiCall as well.
import { makeApiCall } from '../actions/index';

class Headlines extends React.Component {
  constructor(props) {
    super(props); // We remove this.state from the constructor. We're using Redux to fully handle our state now.
    // We will remove this.state since we'll be using the Redux store to handle state.
    // this.state = {
    //   error: null,
    //   isLoaded: false,
    //   headlines: []
    // };
  }

  componentDidMount() { // We still make our API call in componentDidMount(). However, now we're using dispatch() to trigger it. Note that we aren't dispatching any of our reducer actions in Headlines.js - that's all being done in our async action. 
    //(There are plenty of use cases where we would dispatch reducer actions still - however, we just don't need to do so here.)
    // Now we'll use dispatch() to make our API call.
    const { dispatch } = this.props;
    dispatch(makeApiCall());
  }

  render() {
    // We deconstruct the mapped Redux properties from this.props.
    const { error, isLoading, headlines } = this.props; // we deconstruct this.props. Our Redux state has been mapped to this.props because...
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (isLoading) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>Headlines</h1>
          <ul>
            {headlines.map((headline, index) => // One more thing to note - we use index with map to give each headline an id. While this works fine, we recommend using UUID to set up ids instead.
              <li key={index}>
                <h3>{headline.title}</h3>
                <p>{headline.abstract}</p>
              </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
  }
}


// We'll also need to add mapStateToProps() as well.
// We've added mapStateToProps() to map isLoading, headlines and error from Redux state.
const mapStateToProps = state => {
  return {
    headlines: state.headlines,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(mapStateToProps)(Headlines); // Finally, we use connect() to wrap our component in an HOC with Redux functionality.

// Note: When the application is ran; The logged messages are coming from our custom middleware function. As we can see here, the original state is the default state before we make the API call.
  // The current action is GET_HEADLINES_SUCCESS - which includes a payload of NYT headlines.
  // Finally, the updated state shows that headlines now has all the NYT headlines from our payload.

  // This is what Redux middleware does for us. We can interrupt a reducer action to use middleware before, during or after that reducer action.