// types/navigation.ts
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// User type definition
export interface User {
  name: string;
  username: string;
  avatar: string;
}

// Post type definition
export interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  retweets: number;
  liked: boolean;
}

// Chat type definition
export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  isGroup: boolean;
}

// Feed Stack param list
export type FeedStackParamList = {
  FeedMain: undefined;
  PostDetail: {
    post: Post;
  };
  UserProfile: {
    user: User;
  };
};

// Chat Stack param list
export type ChatStackParamList = {
  ChatList: undefined;
  ChatScreen: {
    chat: Chat;
  };
  ChatInfo: {
    chat: Chat;
  };
  NewChat: undefined;
};

// Profile Stack param list
export type ProfileStackParamList = {
  ProfileMain: { user: User };
  EditProfile: undefined;
  Settings: undefined;
  SavedPosts: undefined;
};

// Main Tab param list
export type MainTabParamList = {
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Chats: NavigatorScreenParams<ChatStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// Root Stack param list (if you have a root stack navigator)
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  // Add any modal or root-level screens here
  // Example: AuthStack, Onboarding, etc.
};

// Screen props type helpers
export type FeedStackScreenProps<T extends keyof FeedStackParamList> =
  NativeStackScreenProps<FeedStackParamList, T>;

export type ChatStackScreenProps<T extends keyof ChatStackParamList> =
  NativeStackScreenProps<ChatStackParamList, T>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Declare global types for React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
