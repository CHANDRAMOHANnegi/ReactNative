import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ProfileScreen,
  EditProfileScreen,
  ViewProfileScreen,
} from '../screens';

const ProfileStack = createNativeStackNavigator();

export const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#059669' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="ViewProfile" component={ViewProfileScreen} />
    </ProfileStack.Navigator>
  );
};
