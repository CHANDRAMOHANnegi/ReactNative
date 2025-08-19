import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { SAMPLE_POSTS } from '../../../constants';

async function getPosts() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(SAMPLE_POSTS);
    }, 2000);
  });
}

export const FeedScreen = ({}) => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    getPosts()
      .then(d => {
        setPosts(prevPosts => [...d, ...prevPosts]);
      })
      .catch(er => {
        console.log(er);
      });
    return () => {};
  }, []);

  console.log(posts);

  const handleLike = postId => {
    setPosts(
      posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      }),
    );
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        user: {
          name: 'You',
          username: '@you',
          avatar: 'https://i.pravatar.cc/150?img=10',
        },
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        retweets: 0,
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
        <TouchableOpacity onPress={() => setShowNewPost(true)}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
          >
            <View style={styles.postHeader}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserProfile', { user: item.user })
                }
              >
                <Image
                  source={{ uri: item.user.avatar }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <View style={styles.postUserInfo}>
                <Text style={styles.postUserName}>{item.user.name}</Text>
                <Text style={styles.postUsername}>
                  {item.user.username} · {item.timestamp}
                </Text>
              </View>
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

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(item.id)}
              >
                <Text style={[styles.actionIcon, item.liked && styles.liked]}>
                  {item.liked ? '❤️' : '🤍'}
                </Text>
                <Text style={styles.actionCount}>{item.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📤</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={showNewPost} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.newPostModal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowNewPost(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>New Post</Text>
              <TouchableOpacity onPress={handleCreatePost}>
                <Text style={styles.postButton}>Post</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.newPostInput}
              placeholder="What's happening?"
              placeholderTextColor="#666"
              multiline
              value={newPost}
              onChangeText={setNewPost}
              autoFocus
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
