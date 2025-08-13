import { StyleSheet } from 'react-native';
// Styles
export const styles = StyleSheet.create({
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
  backButton: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
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
  sendIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
});
