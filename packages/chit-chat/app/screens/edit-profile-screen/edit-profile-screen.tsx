import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { styles } from './style';
import { useState } from 'react';

export const EditProfileScreen = ({ navigation }) => {
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
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Saved', 'Profile updated successfully');
            navigation.goBack();
          }}
        >
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
