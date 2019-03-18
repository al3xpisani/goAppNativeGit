import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Welcome from './src/pages/Welcome';
import Repositories from './src/pages/Repositories';
import Organizations from './src/pages/Organizations';
import { colors } from './src/styles';

const Routes = (user = false) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome,
      User: createBottomTabNavigator(
        {
          Repositories,
          Organizations,
        },
        {
          tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: colors.whiteTransparent,
            style: {
              backgroundColor: colors.secundary,
            },
          },
        },
      ),
    },
    {
      initialRouteName: user ? 'User' : 'Welcome',
    },
  ),
);

export default Routes;
