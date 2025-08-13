import { View,TouchableOpacity,Text, FlatList, Image, ScrollView } from "react-native";
import { styles } from "./style";
import { useState } from "react";

// Saved Posts Screen
export const UserProfileScreen = ({ route, navigation }) => {
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
            <Text
              style={[styles.followText, isFollowing && styles.followingText]}
            >
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
                <Text style={styles.postUsername}>
                  {user.username} · 1d ago
                </Text>
              </View>
            </View>
            <Text style={styles.postContent}>
              Working on something exciting! Can't wait to share it with
              everyone 🚀
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

