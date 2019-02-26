import React from 'react';
import { connect } from 'dva';

interface PageProps {
  dispatch: any;
  location: any;
  users: any[];
}

const mapStateToProps = (state: any) => state.app;
@connect(mapStateToProps)
class App extends React.Component<PageProps> {
  public render() {
    const { users } = this.props;
    return <div>Index Page:{JSON.stringify(users)}</div>;
  }
}

export default App;
