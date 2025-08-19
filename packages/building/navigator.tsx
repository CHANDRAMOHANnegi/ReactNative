

import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeFloorBlueprint, ProfileFloorBlueprint, Tab } from './navigation';

// STEP 3: Create simple screens (rooms)
const HomeRoom = () => {
  // This is the magic part - useNavigation gives you access to move around
  const navigation = useNavigation<any>(); // We'll keep it simple with 'any' for now
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>🏠 Home Room</Text>
      
      {/* Move to another room on the same floor */}
      <Button 
        title="Go to Details Room (same floor)" 
        onPress={() => navigation.navigate('DetailsRoom', { id: '123' })}
      />
      
      {/* Move to a different floor */}
      <Button 
        title="Go to Profile Floor" 
        onPress={() => navigation.navigate('ProfileFloor')}
      />
    </View>
  );
};

const DetailsRoom = ({ route }: any) => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>📋 Details Room</Text>
      <Text>Item ID: {route.params?.id}</Text>
      
      <Button 
        title="Go Back to Home Room" 
        onPress={() => navigation.goBack()}
      />
      
      <Button 
        title="Go to Profile Floor" 
        onPress={() => navigation.navigate('ProfileFloor')}
      />
    </View>
  );
};

const ProfileRoom = () => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>👤 Profile Room</Text>
      
      <Button 
        title="Go to Edit Room (same floor)" 
        onPress={() => navigation.navigate('EditRoom', { userId: 'user123' })}
      />
      
      <Button 
        title="Go to Home Floor" 
        onPress={() => navigation.navigate('HomeFloor')}
      />
    </View>
  );
};

const EditRoom = ({ route }: any) => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>✏️ Edit Room</Text>
      <Text>Editing user: {route.params?.userId}</Text>
      
      <Button 
        title="Go Back to Profile Room" 
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const SettingsRoom = () => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>⚙️ Settings Room</Text>
      
      <Button 
        title="Go to Home Floor" 
        onPress={() => navigation.navigate('HomeFloor')}
      />
    </View>
  );
};

// STEP 4: Build each floor (stack of rooms)
const HomeFloor = () => {
  return (
    <HomeFloorBlueprint.Navigator >
      <HomeFloorBlueprint.Screen name="HomeRoom" component={HomeRoom} />
      <HomeFloorBlueprint.Screen name="DetailsRoom" component={DetailsRoom} />
    </HomeFloorBlueprint.Navigator>
  );
};

const ProfileFloor = () => {
  return (
    <ProfileFloorBlueprint.Navigator>
      <ProfileFloorBlueprint.Screen name="ProfileRoom" component={ProfileRoom} />
      <ProfileFloorBlueprint.Screen name="EditRoom" component={EditRoom} />
    </ProfileFloorBlueprint.Navigator>
  );
};

// STEP 5: Build the whole building (tab navigator)
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="HomeFloor" 
          component={HomeFloor}
          options={{ 
            title: 'Home',
            headerShown: false // Let each floor handle its own header
          }}
        />
        <Tab.Screen 
          name="ProfileFloor" 
          component={ProfileFloor}
          options={{ 
            title: 'Profile',
            headerShown: false
          }}
        />
        <Tab.Screen 
          name="SettingsFloor" 
          component={SettingsRoom}
          options={{ title: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

/* 
🎯 SIMPLE RULES TO REMEMBER:

1. BOTTOM TABS = Different sections of your app (like floors)
   - Home tab, Profile tab, Settings tab
   - You tap these to switch between main areas

2. STACK NAVIGATION = Going deeper into each section (like rooms)
   - Home → Details → More Details
   - Profile → Edit Profile → Change Password
   - You can go "back" through these

3. useNavigation() = Your magic remote control
   - Can move between rooms: navigation.navigate('DetailsRoom')
   - Can move between floors: navigation.navigate('ProfileFloor')
   - Can go back: navigation.goBack()

4. WHY BOTH?
   - Tabs: Quick access to main sections (always visible at bottom)
   - Stacks: Deep navigation within each section (can go back)

REAL EXAMPLE:
- Instagram has tabs: Home, Search, Profile
- When you tap a post (stack navigation), you go deeper
- But you can always tap the Home tab to go back to main feed

TypeScript just helps make sure you don't try to go to a room that doesn't exist!
*/