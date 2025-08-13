import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { SAMPLE_CHATS } from '../../../constants';
// import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';

// Chat List Screen
export const ChatListScreen = ({}) => {
  const navigation = useNavigation();

  // const navigation = useNavigation();

  const [chats] = useState(SAMPLE_CHATS);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewChat')}>
          <Text style={styles.plusIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatScreen', { chat: item })}
          >
            <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>
                  {item.isGroup && '👥 '}
                  {item.name}
                </Text>
                <Text style={styles.chatTime}>{item.timestamp}</Text>
              </View>
              <View style={styles.chatPreview}>
                <Text style={styles.chatLastMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
