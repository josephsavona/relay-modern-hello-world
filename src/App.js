import React, { Component } from 'react';

import {
  QueryRenderer,
  createFragmentContainer,
  graphql,
} from 'react-relay';

import environment from './createRelayEnvironment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Tiny GitHunt</h2>
        <QueryRenderer
          environment={environment}

          query={graphql`
            query AppFeedQuery {
              feed (type: NEW, limit: 5) {
                id
                ...FeedEntry
              }
            }
          `}

          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              console.log(props.feed);
              return (
                <ol>
                  {feed.map(entry => (
                    <li key={entry.id}>
                      <FeedEntry data={entry} />
                    </li>
                  ))}
                </ol>
              );
            }
            return <div>Loading</div>;
          }}
        />
        <h3>More info</h3>
        <ul>
          <li><a href="http://www.githunt.com/">Full GitHunt App</a></li>
          <li><a href="https://github.com/stubailo/relay-modern-hello-world">Improve this example on GitHub</a></li>
        </ul>
      </div>
    );
  }
}

const FeedEntry = createFragmentContainer(
  ({ data }) => (
    <div>
      <div>{entry.repository.owner.login}/{entry.repository.name}: {entry.repository.stargazers_count} Stars</div>
      <div>Posted by {entry.postedBy.login}</div>
    </div>
  ),
  graphql`
    fragment FeedEntry on Entry {
      repository {
        owner { login }
        name
        stargazers_count
      }
      postedBy { login }
    }
  `
);

export default App;
