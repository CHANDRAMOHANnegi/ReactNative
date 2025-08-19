import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from './HomeStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import { SettingsStackNavigator } from './settingStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Tab bar icon function moved outside App component
const tabBarIcon = ({
  route,
  focused,
  // color,
  // size,
}: {
  route: any;
  focused: boolean;
  color: string;
  size: number;
}) => {
  let iconName: any;

  if (route.name === 'HomeTab') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'ProfileTab') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route.name === 'SettingsTab') {
    iconName = focused ? 'settings' : 'settings-outline';
  }

  return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
};

export const RNApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: props => tabBarIcon({ route, ...props }),
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          options={{ title: 'Profile' }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsStackNavigator}
          options={{ title: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RNApp;
