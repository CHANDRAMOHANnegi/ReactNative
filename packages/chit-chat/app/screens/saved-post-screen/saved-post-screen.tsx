import { View, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';

// Saved Posts Screen
export const SavedPostsScreen = ({}) => {
  const navigation = useNavigation();
  const savedPosts = [
    {
      id: '1',
      user: {
        name: 'Tech Guru',
        username: '@techguru',
        avatar: 'https://i.pravatar.cc/150?img=16',
      },
      content: '10 Essential Programming Tips Every Developer Should Know 💻',
      timestamp: '3d ago',
      likes: 245,
      comments: 18,
      retweets: 42,
      liked: true,
    },
    {
      id: '2',
      user: {
        name: 'Design Master',
        username: '@designmaster',
        avatar: 'https://i.pravatar.cc/150?img=17',
      },
      content:
        'The future of UI/UX design is here! Check out these amazing trends 🎨',
      timestamp: '1w ago',
      likes: 189,
      comments: 23,
      retweets: 15,
      liked: true,
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Posts</Text>
        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={savedPosts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
          >
            <View style={styles.postHeader}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <View style={styles.postUserInfo}>
                <Text style={styles.postUserName}>{item.user.name}</Text>
                <Text style={styles.postUsername}>
                  {item.user.username} · {item.timestamp}
                </Text>
              </View>
              <TouchableOpacity style={styles.bookmarkButton}>
                <Text style={styles.bookmarkIcon}>🔖</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.postContent}>{item.content}</Text>

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionCount}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>🔁</Text>
                <Text style={styles.actionCount}>{item.retweets}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={[styles.actionIcon, item.liked && styles.liked]}>
                  ❤️
                </Text>
                <Text style={styles.actionCount}>{item.likes}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
