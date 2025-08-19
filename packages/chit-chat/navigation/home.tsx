import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedScreen } from '../app/screens/feed-screen/feed-screen';
import { ChatListScreen } from '../app/screens/chat-list-screen/chat-list-screen';
import { NavigationContainer } from '@react-navigation/native';
import { ProfileScreen } from '../app/screens/profile-screen/profile-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatInfoScreen } from '../app/screens/chat-info-screen/chat-info-screen';
import { ChatScreen } from '../app/screens/chat-screen/chat-screen';
import {
  ChatStackParamList,
  ComponentsStackParamList,
  FeedStackParamList,
  ProfileStackParamList,
} from './navigator';
import { NewChatScreen } from '../app/screens/new-chat-screen/new-chat-screen';
import { PostDetailScreen } from '../app/screens/post-detail-screen/post-details-screen';
import { UserProfileScreen } from '../app/screens/user-profile-screen/user-profile-screen';
import { EditProfileScreen } from '../app/screens/edit-profile-screen/edit-profile-screen';
import { SavedPostsScreen } from '../app/screens/saved-post-screen/saved-post-screen';
import { SettingsScreen } from '../app/screens/setting-screen/setting-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import ComponentsScreen from '../../components/ComponentsScreen';

const Tab = createBottomTabNavigator();

const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const ComponentsStack = createNativeStackNavigator<ComponentsStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="SavedPosts" component={SavedPostsScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatList" component={ChatListScreen} />
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Screen name="ChatInfo" component={ChatInfoScreen} />
      <ChatStack.Screen name="NewChat" component={NewChatScreen} />
    </ChatStack.Navigator>
  );
};

const FeedStackNavigator = () => {
  return (
    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name="FeedMain" component={FeedScreen} />
      <FeedStack.Screen name="PostDetail" component={PostDetailScreen} />
      <FeedStack.Screen name="UserProfile" component={UserProfileScreen} />
    </FeedStack.Navigator>
  );
};

const ComponentsStackNavigator = () => {
  return (
    <ComponentsStack.Navigator screenOptions={{ headerShown: false }}>
      <ComponentsStack.Screen name="Components" component={ComponentsScreen} />
      {/* <ComponentsStack.Screen name="Animations" component={AnimationsScreen} /> */}
    </ComponentsStack.Navigator>
  );
};

const TabIcon = ({
  route,
  focused,
}: {
  focused: boolean;
  color: string;
  size: number;
  route: { name: string };
}) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? '🏠' : '🏡';
  } else if (route.name === 'Chats') {
    iconName = focused ? '💬' : '💭';
  } else if (route.name === 'Profile') {
    iconName = focused ? '👤' : '👥';
  }

  return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: props => <TabIcon {...props} route={route} />,
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
        tabBarBadge: 5,
      })}
    >
      <Tab.Screen
        options={{ tabBarBadge: 10 }}
        name="Home"
        component={FeedStackNavigator}
      />
      <Tab.Screen name="Chats" component={ChatStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Components" component={ComponentsStackNavigator} />
    </Tab.Navigator>
  );
};

export const Home = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <BottomTabs />
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

export default Home;
