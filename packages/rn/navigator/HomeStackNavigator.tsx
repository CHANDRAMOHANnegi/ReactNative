import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen, DetailsScreen, HomeScreen } from '../screens';

const HomeStack = createNativeStackNavigator();

// STEP 6: Create Stack Navigators
export const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6366f1' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
    </HomeStack.Navigator>
  );
};
