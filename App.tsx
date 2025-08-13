import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './packages/chit-chat/app/home';

function App() {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}

export default App;
