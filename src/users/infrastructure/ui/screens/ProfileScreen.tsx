import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../shared/infrastructure/redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>User not logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Image source={{ uri: user.profileImageUrl }} style={styles.profileImage} />
      <Text style={styles.text}>Welcome, {user.firstName} {user.lastName}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
        <Text style={styles.linkText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  linkText: {
    color: '#00f',
    fontSize: 18,
    marginTop: 20,
  },
});

export default ProfileScreen;

