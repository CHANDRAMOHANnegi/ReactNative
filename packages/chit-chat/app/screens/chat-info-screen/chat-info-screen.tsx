import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

// Chat Info Screen
export const ChatInfoScreen = ({ route, navigation }) => {
  const { chat } = route.params;

  return (
    <View style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Info</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView>
        <View style={styles.chatInfoContainer}>
          <Image source={{ uri: chat.avatar }} style={styles.chatInfoAvatar} />
          <Text style={styles.chatInfoName}>{chat.name}</Text>
          {chat.isGroup && (
            <Text style={styles.chatInfoSubtext}>Created on Jan 1, 2024</Text>
          )}
        </View>

        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.infoOption}>
            <Text style={styles.infoIcon}>🔔</Text>
            <Text style={styles.infoText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoOption}>
            <Text style={styles.infoIcon}>⭐</Text>
            <Text style={styles.infoText}>Starred Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoOption}>
            <Text style={styles.infoIcon}>🔍</Text>
            <Text style={styles.infoText}>Search</Text>
          </TouchableOpacity>
        </View>

        {chat.isGroup && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Participants</Text>
            <TouchableOpacity style={styles.participantItem}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                style={styles.participantAvatar}
              />
              <Text style={styles.participantName}>John Doe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.participantItem}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.participantAvatar}
              />
              <Text style={styles.participantName}>Jane Smith</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
