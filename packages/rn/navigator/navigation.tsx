// 🎯 Universal Navigation Approach - One Hook to Rule Them All!

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppNavigation } from './useAppNavigation';

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
          <Button
            title="Profile"
            onPress={() => navigation.navigate('ProfileTab')}
          />
        )}
        {currentScreen !== 'Settings' && (
          <Button
            title="Settings"
            onPress={() => navigation.navigate('SettingsTab')}
          />
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
