import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AboutScreen, PreferencesScreen, SettingsScreen } from '../screens';

const SettingsStack = createNativeStackNavigator();

export const SettingsStackNavigator: React.FC = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#dc2626' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Preferences" component={PreferencesScreen} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
};
