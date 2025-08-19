import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './packages/chit-chat/navigation/home';
import NetworkLogger, {
  startNetworkLogging,
} from 'react-native-network-logger';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

startNetworkLogging();
import { Dimensions, StyleSheet } from 'react-native';
import { useState } from 'react';
import RNApp from './packages/rn/navigator/RNApp';
const { height } = Dimensions.get('window');

const MyScreen = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => (
  <Modal
    visible={visible}
    onRequestClose={() => setVisible(false)}
    animationType="slide"
  >
    <View style={styles.modalContainer}>
      <View style={styles.newPostModal}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
        <NetworkLogger />
      </View>
    </View>
  </Modal>
);

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaProvider>
      {/* <Home /> */}
      <RNApp/>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
      <MyScreen visible={visible} setVisible={setVisible} />
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  newPostModal: {
    // flex: 1,
    backgroundColor: 'red',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: height * 0.5,
    // paddingBottom: 200,
  },
  floatingButton: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: 50,
    height: 50,
    borderRadius: 100,
    // display: 'flex',
    // color: 'white',
    // textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  plusText: {
    lineHeight: 50,
    textAlign: 'center',
  },
});
