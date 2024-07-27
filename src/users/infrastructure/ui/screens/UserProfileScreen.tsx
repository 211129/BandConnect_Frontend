import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';
import { findUserByIdUseCase } from '../../../../users/infrastructure/dependecies';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserEntity from '../../../domain/entities/UserEntity';

type UserProfileScreenRouteProp = RouteProp<RootStackParamList, 'UserProfileScreen'>;

type UserProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfileScreen'>;

type Props = {
  route: UserProfileScreenRouteProp;
  navigation: UserProfileScreenNavigationProp;
};

const UserProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<UserEntity | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await findUserByIdUseCase.execute(userId);
      setUser(userData);
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading user profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Image source={{ uri: user.profileImageUrl }} style={styles.profileImage} />
      <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
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
});

export default UserProfileScreen;
