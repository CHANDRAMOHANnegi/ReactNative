// hooks/useAppNavigation.ts
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../chit-chat/navigation/navigator';

// Define a custom hook to type `useNavigation`:
export const useAppNavigation = (): NavigationProp<RootStackParamList> =>
  useNavigation<NavigationProp<RootStackParamList>>();
