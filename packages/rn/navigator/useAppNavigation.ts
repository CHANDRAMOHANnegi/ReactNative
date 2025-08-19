// STEP 1: Define ALL screens in your app in ONE place

import { NavigationProp, useNavigation } from '@react-navigation/native';

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
