import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

// Profile Screen
export const ProfileScreen = ({ navigation }) =>   {

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