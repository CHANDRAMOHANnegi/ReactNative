import { View } from 'react-native';
import React from 'react';
import { Button } from '../ui/Button/Button';
import { useAppNavigation } from '../hooks/useAppNaviation';

export const ComponentsScreen = ({}) => {
  const { navigate } = useAppNavigation();
  return (
    <View>
      <Button
        title="Alert"
        onPress={() => navigate('Components')}
      />
    </View>
  );
};

export default ComponentsScreen;
