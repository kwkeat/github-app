import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Initial from 'containers/Initial';
import Auth from 'containers/Auth';
import Dashboard from 'containers/Dashboard';
import UserDetail from 'containers/UserDetail';

const routeConfiguration = {
  Initial: { screen: Initial },
  Auth: { screen: Auth },
  Dashboard: { screen: Dashboard },
  UserDetail: { screen: UserDetail },
};

const AppNavigator = createSwitchNavigator(routeConfiguration);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
