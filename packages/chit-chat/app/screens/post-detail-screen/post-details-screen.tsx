import { useState } from "react";
import { styles } from "./style";
import {  Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Post Detail Screen
export const PostDetailScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      user: { name: 'User One', avatar: 'https://i.pravatar.cc/150?img=7' },
      text: 'Great post!',
      timestamp: '1h ago',
    },
    {
      id: '2',
      user: { name: 'User Two', avatar: 'https://i.pravatar.cc/150?img=8' },
      text: 'Totally agree with this',
      timestamp: '2h ago',
    },
  ]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        user: { name: 'You', avatar: 'https://i.pravatar.cc/150?img=10' },
        text: comment,
        timestamp: 'Just now',
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView>
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
            <View style={styles.postUserInfo}>
              <Text style={styles.postUserName}>{post.user.name}</Text>
              <Text style={styles.postUsername}>
                {post.user.username} · {post.timestamp}
              </Text>
            </View>
          </View>

          <Text style={styles.postContent}>{post.content}</Text>

          <View style={styles.postStats}>
            <Text style={styles.statText}>{likes} Likes</Text>
            <Text style={styles.statText}>{post.comments} Comments</Text>
            <Text style={styles.statText}>{post.retweets} Retweets</Text>
          </View>

          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💬</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔁</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Text style={[styles.actionIcon, liked && styles.liked]}>
                {liked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📤</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.commentSection}>
          <Text style={styles.sectionTitle}>Comments</Text>

          <View style={styles.commentInput}>
            <TextInput
              style={styles.commentTextInput}
              placeholder="Add a comment..."
              placeholderTextColor="#666"
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity onPress={handleComment}>
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>

          {comments.map(item => (
            <View key={item.id} style={styles.commentItem}>
              <Image
                source={{ uri: item.user.avatar }}
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>{item.user.name}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentTime}>{item.timestamp}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};