// 🎯 Universal Navigation Approach - One Hook to Rule Them All!

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppNavigation } from '../navigator/useAppNavigation';

// ✅ Profile Screen
export const ProfileScreen: React.FC = () => {
  const navigation = useAppNavigation(); // Same hook!

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile Screen</Text>
      <Text style={styles.subtitle}>User Profile Information</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit Profile"
          onPress={() =>
            navigation.navigate('EditProfile', {
              userId: 'user123',
              mode: 'edit',
            })
          }
        />

        <Button
          title="View Public Profile"
          onPress={() =>
            navigation.navigate('ViewProfile', {
              profileId: 'user123',
            })
          }
        />

        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('HomeTab')}
        />
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
