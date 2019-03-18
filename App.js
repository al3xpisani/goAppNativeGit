import './src/config/reactotron-config';
import './src/config/react-devtools';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import createNavigatorRule from './Routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    // await AsyncStorage.clear();
    const user = await AsyncStorage.getItem('@GitHub:Users');

    this.setState({
      userLogged: !!user,
      userChecked: true,
    });
  }

  render() {
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigatorRule(userLogged);
    return <Routes />;
  }
}
