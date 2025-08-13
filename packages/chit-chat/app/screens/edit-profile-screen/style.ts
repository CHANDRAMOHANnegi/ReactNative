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

});
