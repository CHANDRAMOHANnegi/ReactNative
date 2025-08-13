import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';

// New Chat Screen
export const NewChatScreen = ({}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const contacts = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/150?img=13',
      status: 'Available',
    },
    {
      id: '2',
      name: 'Bob Williams',
      avatar: 'https://i.pravatar.cc/150?img=14',
      status: 'Busy',
    },
    {
      id: '3',
      name: 'Carol Davis',
      avatar: 'https://i.pravatar.cc/150?img=15',
      status: 'Away',
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chat</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <TouchableOpacity style={styles.newGroupOption}>
        <Text style={styles.groupIcon}>👥</Text>
        <Text style={styles.newGroupText}>New Group</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => {
              navigation.navigate('ChatScreen', {
                chat: {
                  id: item.id,
                  name: item.name,
                  avatar: item.avatar,
                  isGroup: false,
                },
              });
            }}
          >
            <Image source={{ uri: item.avatar }} style={styles.contactAvatar} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactStatus}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
