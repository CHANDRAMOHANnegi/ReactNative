// App.js - Complete Social Media App with React Navigation
import React from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './screens/profile-screen/profile-screen';
import { SavedPostsScreen } from './screens/saved-post-screen/saved-post-screen';
import { UserProfileScreen } from './screens/user-profile-screen/user-profile-screen';
import { FeedScreen } from './screens/feed-screen/feed-screen';
import { PostDetailScreen } from './screens/post-detail-screen/post-details-screen';
import { ChatListScreen } from './screens/chat-list-screen/chat-list-screen';
import { SettingsScreen } from './screens/setting-screen/setting-screen';
import { EditProfileScreen } from './screens/edit-profile-screen/edit-profile-screen';
import { ChatScreen } from './screens/chat-screen/chat-screen';
import { ChatInfoScreen } from './screens/chat-info-screen/chat-info-screen';
import { NewChatScreen } from './screens/new-chat-screen/new-chat-screen';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Feed Stack Navigator
const FeedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedMain" component={FeedScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

// Chat Stack Navigator
const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatInfo" component={ChatInfoScreen} />
      <Stack.Screen name="NewChat" component={NewChatScreen} />
    </Stack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="SavedPosts" component={SavedPostsScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? '🏠' : '🏡';
          } else if (route.name === 'Chats') {
            iconName = focused ? '💬' : '💭';
          } else if (route.name === 'Profile') {
            iconName = focused ? '👤' : '👥';
          }

          return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e1e1e1',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedStackNavigator} />
      <Tab.Screen name="Chats" component={ChatStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        <MainTabNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
