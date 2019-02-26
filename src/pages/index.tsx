import React from 'react';
import { queryCurrent } from '../services/user';

interface PageProps {
  dispatch: any;
  location: any;
}

class App extends React.Component<PageProps> {
  state = {
    users: [],
  };

  async componentDidMount() {
    queryCurrent().then(res => {
      this.setState({
        users: res,
      });
    });
  }

  public render() {
    const { users } = this.state;
    return <div>Index Page:{JSON.stringify(users)}</div>;
  }
}

export default App;
