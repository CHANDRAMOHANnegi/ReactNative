// 🎯 Universal Navigation Approach - One Hook to Rule Them All!

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// STEP 1: Define ALL screens in your app in ONE place
// This is your single source of truth for navigation!
export type AllAppScreens = {
  // Tab screens (main sections)
  HomeTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
  
  // Home stack screens
  Home: undefined;
  Details: { 
    id: string; 
    name: string;
    description?: string;
  };
  Search: { 
    query?: string;
    category?: string;
  };
  
  // Profile stack screens
  Profile: undefined;
  EditProfile: { 
    userId: string;
    mode?: 'edit' | 'view';
  };
  ViewProfile: { 
    profileId: string;
  };
  
  // Settings screens
  Settings: undefined;
  Preferences: undefined;
  About: undefined;
};

// STEP 2: Create ONE universal navigation type
type UniversalNavigationType = NavigationProp<AllAppScreens>;

// STEP 3: Create ONE simple hook that works everywhere!
export const useAppNavigation = () => {
  return useNavigation<UniversalNavigationType>();
};

// STEP 4: Create typed navigators (but you only define types once!)
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

// STEP 5: Create your screens - all using the SAME hook!

// ✅ Home Screen
const HomeScreen: React.FC = () => {
  const navigation = useAppNavigation(); // Same hook everywhere!
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home Screen</Text>
      <Text style={styles.subtitle}>Universal Navigation Demo</Text>
      
      {/* Navigate within same stack */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Go to Details" 
          onPress={() => navigation.navigate('Details', { 
            id: '123', 
            name: 'Cool Product',
            description: 'This is a cool product!'
          })}
        />
        
        <Button 
          title="Search Products" 
          onPress={() => navigation.navigate('Search', { 
            query: 'react native',
            category: 'tech'
          })}
        />
      </View>
      
      {/* Navigate to different tabs */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Go to Profile" 
          onPress={() => navigation.navigate('ProfileTab')}
        />
        
        <Button 
          title="Go to Settings" 
          onPress={() => navigation.navigate('SettingsTab')}
        />
      </View>
    </View>
  );
};

// ✅ Details Screen
const DetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useAppNavigation(); // Same hook!
  const { id, name, description } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Details Screen</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>ID: {id}</Text>
        <Text style={styles.infoText}>Name: {name}</Text>
        {description && <Text style={styles.infoText}>Description: {description}</Text>}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Search Related Items" 
          onPress={() => navigation.navigate('Search', { 
            query: name,
            category: 'related'
          })}
        />
        
        <Button 
          title="Go to Profile" 
          onPress={() => navigation.navigate('ProfileTab')}
        />
        
        <Button 
          title="Go Back" 
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

// ✅ Search Screen
const SearchScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useAppNavigation(); // Same hook!
  const { query, category } = route.params || {};
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search Screen</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Query: {query || 'None'}</Text>
        <Text style={styles.infoText}>Category: {category || 'All'}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="View Sample Details" 
          onPress={() => navigation.navigate('Details', { 
            id: 'search-result-1',
            name: 'Search Result Item'
          })}
        />
        
        <Button 
          title="Go Back" 
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

// ✅ Profile Screen
const ProfileScreen: React.FC = () => {
  const navigation = useAppNavigation(); // Same hook!
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile Screen</Text>
      <Text style={styles.subtitle}>User Profile Information</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Edit Profile" 
          onPress={() => navigation.navigate('EditProfile', { 
            userId: 'user123',
            mode: 'edit'
          })}
        />
        
        <Button 
          title="View Public Profile" 
          onPress={() => navigation.navigate('ViewProfile', { 
            profileId: 'user123'
          })}
        />
        
        <Button 
          title="Go to Home" 
          onPress={() => navigation.navigate('HomeTab')}
        />
      </View>
    </View>
  );
};

// ✅ Edit Profile Screen
const EditProfileScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useAppNavigation(); // Same hook!
  const { userId, mode } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✏️ Edit Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>User ID: {userId}</Text>
        <Text style={styles.infoText}>Mode: {mode}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="View Profile" 
          onPress={() => navigation.navigate('ViewProfile', { 
            profileId: userId 
          })}
        />
        
        <Button 
          title="Save & Go Back" 
          onPress={() => navigation.goBack()}
        />
        
        <Button 
          title="Go to Settings" 
          onPress={() => navigation.navigate('SettingsTab')}
        />
      </View>
    </View>
  );
};

// ✅ View Profile Screen
const ViewProfileScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useAppNavigation(); // Same hook!
  const { profileId } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👀 View Profile</Text>
      <Text style={styles.infoText}>Profile ID: {profileId}</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Edit Profile" 
          onPress={() => navigation.navigate('EditProfile', { 
            userId: profileId,
            mode: 'edit'
          })}
        />
        
        <Button 
          title="Go Back" 
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

// ✅ Settings Screen
const SettingsScreen: React.FC = () => {
  const navigation = useAppNavigation(); // Same hook!
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>
      <Text style={styles.subtitle}>App Settings & Preferences</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Preferences" 
          onPress={() => navigation.navigate('Preferences')}
        />
        
        <Button 
          title="About" 
          onPress={() => navigation.navigate('About')}
        />
        
        <Button 
          title="Go to Profile" 
          onPress={() => navigation.navigate('ProfileTab')}
        />
        
        <Button 
          title="Go to Home" 
          onPress={() => navigation.navigate('HomeTab')}
        />
      </View>
    </View>
  );
};

// ✅ Preferences Screen
const PreferencesScreen: React.FC = () => {
  const navigation = useAppNavigation(); // Same hook!
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Preferences</Text>
      <Text style={styles.subtitle}>Customize your app experience</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Go Back to Settings" 
          onPress={() => navigation.goBack()}
        />
        
        <Button 
          title="Go to Home" 
          onPress={() => navigation.navigate('HomeTab')}
        />
      </View>
    </View>
  );
};

// ✅ About Screen
const AboutScreen: React.FC = () => {
  const navigation = useAppNavigation(); // Same hook!
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ℹ️ About</Text>
      <Text style={styles.subtitle}>App version 1.0.0</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Go Back to Settings" 
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

// STEP 6: Create Stack Navigators
const HomeStackNavigator: React.FC = () => {
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

const ProfileStackNavigator: React.FC = () => {
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

const SettingsStackNavigator: React.FC = () => {
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

// STEP 7: Main App with Tab Navigator
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'SettingsTab') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
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

// STEP 8: Reusable Components (bonus!)
// Since we have one universal hook, components are truly reusable!

interface QuickNavigationProps {
  currentScreen?: string;
}

const QuickNavigation: React.FC<QuickNavigationProps> = ({ currentScreen }) => {
  const navigation = useAppNavigation(); // Works in any component!
  
  return (
    <View style={styles.quickNavContainer}>
      <Text style={styles.quickNavTitle}>Quick Navigation</Text>
      <View style={styles.quickNavButtons}>
        {currentScreen !== 'Home' && (
          <Button title="Home" onPress={() => navigation.navigate('HomeTab')} />
        )}
        {currentScreen !== 'Profile' && (
          <Button title="Profile" onPress={() => navigation.navigate('ProfileTab')} />
        )}
        {currentScreen !== 'Settings' && (
          <Button title="Settings" onPress={() => navigation.navigate('SettingsTab')} />
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#e5e7eb',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  quickNavContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    width: '100%',
  },
  quickNavTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  quickNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
});

export default App;

// 🎉 BENEFITS OF THIS APPROACH:

/*
✅ ONE hook for everything: useAppNavigation()
✅ TypeScript autocomplete for ALL screens
✅ Parameter validation for ALL navigation
✅ Easy to maintain - all screens defined in one place
✅ Reusable components work everywhere
✅ Simple to understand and use
✅ No complex composite types
✅ Perfect balance of simplicity and type safety

🚀 USAGE PATTERN:
1. Define all screens in AllAppScreens type
2. Use useAppNavigation() in every component
3. Navigate to any screen from anywhere
4. TypeScript keeps you safe!

This is the approach most successful React Native apps use!
*/