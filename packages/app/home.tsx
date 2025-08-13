// App.js - Complete Social Media App with React Navigation
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  Dimensions,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Sample Data
const SAMPLE_POSTS = [
  {
    id: '1',
    user: { name: 'John Doe', username: '@johndoe', avatar: 'https://i.pravatar.cc/150?img=1' },
    content: 'Just shipped a new feature! Feeling accomplished 🚀',
    timestamp: '2h ago',
    likes: 42,
    comments: 5,
    retweets: 3,
    liked: false
  },
  {
    id: '2',
    user: { name: 'Sarah Wilson', username: '@sarahw', avatar: 'https://i.pravatar.cc/150?img=2' },
    content: 'Amazing sunset today! Nature never fails to inspire 🌅\n\n#photography #nature',
    timestamp: '4h ago',
    likes: 128,
    comments: 12,
    retweets: 8,
    liked: true
  },
  {
    id: '3',
    user: { name: 'Tech News', username: '@technews', avatar: 'https://i.pravatar.cc/150?img=3' },
    content: 'Breaking: New AI breakthrough announced at major tech conference. This could change everything!',
    timestamp: '6h ago',
    likes: 523,
    comments: 89,
    retweets: 145,
    liked: false
  }
];

const SAMPLE_CHATS = [
  {
    id: '1',
    name: 'Team Project',
    lastMessage: 'Great work on the presentation!',
    timestamp: '10:30 AM',
    unread: 2,
    avatar: 'https://i.pravatar.cc/150?img=4',
    isGroup: true
  },
  {
    id: '2',
    name: 'Alice Johnson',
    lastMessage: 'See you tomorrow!',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=5',
    isGroup: false
  },
  {
    id: '3',
    name: 'Bob Smith',
    lastMessage: 'Thanks for the help',
    timestamp: 'Monday',
    unread: 1,
    avatar: 'https://i.pravatar.cc/150?img=6',
    isGroup: false
  }
];

const SAMPLE_MESSAGES = [
  {
    id: '1',
    text: 'Hey! How are you?',
    sender: 'other',
    timestamp: '10:00 AM'
  },
  {
    id: '2',
    text: "I'm doing great! Just working on the new project",
    sender: 'me',
    timestamp: '10:02 AM'
  },
  {
    id: '3',
    text: 'That sounds exciting! Need any help?',
    sender: 'other',
    timestamp: '10:05 AM'
  },
  {
    id: '4',
    text: 'Actually yes, could you review my code later?',
    sender: 'me',
    timestamp: '10:06 AM'
  }
];

// Feed Screen Component
const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        user: { name: 'You', username: '@you', avatar: 'https://i.pravatar.cc/150?img=10' },
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        retweets: 0,
        liked: false
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.postCard}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
          >
            <View style={styles.postHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('UserProfile', { user: item.user })}
              >
                <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              </TouchableOpacity>
              <View style={styles.postUserInfo}>
                <Text style={styles.postUserName}>{item.user.name}</Text>
                <Text style={styles.postUsername}>{item.user.username} · {item.timestamp}</Text>
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
      
      <Modal
        visible={showNewPost}
        animationType="slide"
        transparent={true}
      >
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

// Post Detail Screen
const PostDetailScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      user: { name: 'User One', avatar: 'https://i.pravatar.cc/150?img=7' },
      text: 'Great post!',
      timestamp: '1h ago'
    },
    {
      id: '2',
      user: { name: 'User Two', avatar: 'https://i.pravatar.cc/150?img=8' },
      text: 'Totally agree with this',
      timestamp: '2h ago'
    }
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
        timestamp: 'Just now'
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
              <Text style={styles.postUsername}>{post.user.username} · {post.timestamp}</Text>
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
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleLike}
            >
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

          {comments.map((item) => (
            <View key={item.id} style={styles.commentItem}>
              <Image source={{ uri: item.user.avatar }} style={styles.commentAvatar} />
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

// Chat List Screen
const ChatListScreen = ({ navigation }) => {
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatScreen', { chat: item })}
          >
            <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>
                  {item.isGroup && '👥 '}{item.name}
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

// Individual Chat Screen
const ChatScreen = ({ route, navigation }) => {
  const { chat } = route.params;
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.chatScreenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.chatHeaderTouchable}
          onPress={() => navigation.navigate('ChatInfo', { chat })}
        >
          <Image source={{ uri: chat.avatar }} style={styles.chatHeaderAvatar} />
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{chat.name}</Text>
            <Text style={styles.chatHeaderStatus}>Online</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Options', 'Chat options')}>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'me' ? styles.myMessage : styles.otherMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.sender === 'me' ? styles.myMessageText : styles.otherMessageText
            ]}>
              {msg.text}
            </Text>
            <Text style={styles.messageTime}>{msg.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Chat Info Screen
const ChatInfoScreen = ({ route, navigation }) => {
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
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.participantAvatar} />
              <Text style={styles.participantName}>John Doe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.participantItem}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.participantAvatar} />
              <Text style={styles.participantName}>Jane Smith</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// New Chat Screen
const NewChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const contacts = [
    { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=13', status: 'Available' },
    { id: '2', name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?img=14', status: 'Busy' },
    { id: '3', name: 'Carol Davis', avatar: 'https://i.pravatar.cc/150?img=15', status: 'Away' },
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => {
              navigation.navigate('ChatScreen', { 
                chat: { 
                  id: item.id, 
                  name: item.name, 
                  avatar: item.avatar,
                  isGroup: false 
                } 
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

// Profile Screen
const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=10' }} 
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>Your Name</Text>
          <Text style={styles.profileUsername}>@yourusername</Text>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>348</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileMenu}>
          <TouchableOpacity 
            style={styles.profileMenuItem}
            onPress={() => navigation.navigate('SavedPosts')}
          >
            <Text style={styles.menuIcon}>🔖</Text>
            <Text style={styles.menuText}>Saved Posts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileMenuItem}>
            <Text style={styles.menuIcon}>📊</Text>
            <Text style={styles.menuText}>Analytics</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileMenuItem}>
            <Text style={styles.menuIcon}>🔒</Text>
            <Text style={styles.menuText}>Privacy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Edit Profile Screen
const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Your Name');
  const [username, setUsername] = useState('yourusername');
  const [bio, setBio] = useState('Your bio goes here');

  return (
    <View style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={() => {
          Alert.alert('Saved', 'Profile updated successfully');
          navigation.goBack();
        }}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.editProfileContainer}>
        <TouchableOpacity style={styles.avatarEditContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=10' }} 
            style={styles.profileAvatar}
          />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        <View style={styles.editField}>
          <Text style={styles.editLabel}>Name</Text>
          <TextInput
            style={styles.editInput}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.editField}>
          <Text style={styles.editLabel}>Username</Text>
          <TextInput
            style={styles.editInput}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.editField}>
          <Text style={styles.editLabel}>Bio</Text>
          <TextInput
            style={[styles.editInput, styles.bioInput]}
            value={bio}
            onChangeText={setBio}
            multiline
            placeholderTextColor="#666"
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Settings Screen
const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView>
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>👤</Text>
            <Text style={styles.settingsText}>Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>🔔</Text>
            <Text style={styles.settingsText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>🔒</Text>
            <Text style={styles.settingsText}>Privacy & Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>💾</Text>
            <Text style={styles.settingsText}>Data Usage</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>❓</Text>
            <Text style={styles.settingsText}>Help</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>ℹ️</Text>
            <Text style={styles.settingsText}>About</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// User Profile Screen (viewing other users)
const UserProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user.username}</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileUsername}>{user.username}</Text>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2.5K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>892</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={[styles.followText, isFollowing && styles.followingText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.userBio}>
            Love creating amazing content and connecting with people! 🌟
          </Text>
        </View>

        <View style={styles.userPosts}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.postUserInfo}>
                <Text style={styles.postUserName}>{user.name}</Text>
                <Text style={styles.postUsername}>{user.username} · 1d ago</Text>
              </View>
            </View>
            <Text style={styles.postContent}>
              Working on something exciting! Can't wait to share it with everyone 🚀
            </Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionCount}>12</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>🔁</Text>
                <Text style={styles.actionCount}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>🤍</Text>
                <Text style={styles.actionCount}>34</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Saved Posts Screen
const SavedPostsScreen = ({ navigation }) => {
  const savedPosts = [
    {
      id: '1',
      user: { name: 'Tech Guru', username: '@techguru', avatar: 'https://i.pravatar.cc/150?img=16' },
      content: '10 Essential Programming Tips Every Developer Should Know 💻',
      timestamp: '3d ago',
      likes: 245,
      comments: 18,
      retweets: 42,
      liked: true
    },
    {
      id: '2',
      user: { name: 'Design Master', username: '@designmaster', avatar: 'https://i.pravatar.cc/150?img=17' },
      content: 'The future of UI/UX design is here! Check out these amazing trends 🎨',
      timestamp: '1w ago',
      likes: 189,
      comments: 23,
      retweets: 15,
      liked: true
    }
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.postCard}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
          >
            <View style={styles.postHeader}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <View style={styles.postUserInfo}>
                <Text style={styles.postUserName}>{item.user.name}</Text>
                <Text style={styles.postUsername}>{item.user.username} · {item.timestamp}</Text>
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
                <Text style={[styles.actionIcon, item.liked && styles.liked]}>❤️</Text>
                <Text style={styles.actionCount}>{item.likes}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Feed Stack Navigator
const FeedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedMain" component={FeedScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

// Chat Stack Navigator
const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatInfo" component={ChatInfoScreen} />
      <Stack.Screen name="NewChat" component={NewChatScreen} />
    </Stack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="SavedPosts" component={SavedPostsScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Feed') {
            iconName = focused ? '🏠' : '🏡';
          } else if (route.name === 'Chats') {
            iconName = focused ? '💬' : '💭';
          } else if (route.name === 'Profile') {
            iconName = focused ? '👤' : '👥';
          }
          
          return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e1e1e1',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedStackNavigator} />
      <Tab.Screen name="Chats" component={ChatStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        <MainTabNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#ffffff',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  plusIcon: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  settingsIcon: {
    fontSize: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  
  // Post Styles
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postUsername: {
    fontSize: 14,
    color: '#666',
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  actionCount: {
    fontSize: 14,
    color: '#666',
  },
  liked: {
    color: '#ff3040',
  },
  postStats: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginVertical: 8,
  },
  statText: {
    marginRight: 16,
    fontSize: 14,
    color: '#666',
  },
  bookmarkButton: {
    marginLeft: 'auto',
  },
  bookmarkIcon: {
    fontSize: 18,
    color: '#007AFF',
  },
  
  // Comment Styles
  commentSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  commentTextInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  
  // Chat Styles
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
  },
  chatPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatLastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  
  // Chat Screen Styles
  chatScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#ffffff',
  },
  chatHeaderTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  chatHeaderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  moreIcon: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 16,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    backgroundColor: '#ffffff',
  },
  attachButton: {
    marginRight: 8,
  },
  attachIcon: {
    fontSize: 18,
    color: '#666',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
  
  // Chat Info Styles
  chatInfoContainer: {
    alignItems: 'center',
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatInfoAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  chatInfoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  chatInfoSubtext: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  participantName: {
    fontSize: 16,
    color: '#333',
  },
  
  // New Chat Styles
  newGroupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  groupIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  newGroupText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactStatus: {
    fontSize: 14,
    color: '#666',
  },
  
  // Profile Styles
  profileContainer: {
    alignItems: 'center',
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  profileStats: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editProfileButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 16,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  followButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 16,
  },
  followingButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  followText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  followingText: {
    color: '#007AFF',
  },
  userBio: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  userPosts: {
    padding: 16,
  },
  profileMenu: {
    paddingVertical: 16,
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  
  // Edit Profile Styles
  editProfileContainer: {
    flex: 1,
  },
  avatarEditContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  changePhotoText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 8,
  },
  editField: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  editLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  editInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  cancelButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  saveButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  
  // Settings Styles
  settingsSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingsIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  settingsText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: '#ff3040',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  newPostModal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  newPostInput: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
});

export default App;