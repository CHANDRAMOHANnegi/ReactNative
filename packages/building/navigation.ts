// 🏢 THINK OF IT LIKE A BUILDING
// 
// Bottom Tabs = Different FLOORS of a building (Home, Profile, Settings)
// Stack Navigation = ROOMS on each floor (you can go deeper into rooms)

// 📱 YOUR APP STRUCTURE LOOKS LIKE THIS:
//
// Tab 1: Home Floor     Tab 2: Profile Floor    Tab 3: Settings Floor
// ├── Home Room         ├── Profile Room        ├── Settings Room
// ├── Details Room      ├── Edit Profile Room   └── (single room)
// └── Search Room       └── View Profile Room

// Let's build this step by step, super simple!

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// STEP 1: Define what each "floor" (tab) can contain
type HomeFloorRooms = {
  HomeRoom: undefined;
  DetailsRoom: { id?: string };
};

type ProfileFloorRooms = {
  ProfileRoom: undefined;
  EditRoom: { userId: string };
};

type AppFloors = {
  HomeFloor: undefined;
  ProfileFloor: undefined;
  SettingsFloor: undefined;
};

// STEP 2: Create the navigators (think of them as blueprints)
export const Tab = createBottomTabNavigator<AppFloors>();
export const HomeFloorBlueprint = createNativeStackNavigator<HomeFloorRooms>();
export const ProfileFloorBlueprint = createNativeStackNavigator<ProfileFloorRooms>();
