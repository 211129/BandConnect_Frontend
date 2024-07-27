import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';
import ParticipantEntity from '../../../../users/domain/entities/ParticipantEntity';

type UserListItemProps = {
  user: ParticipantEntity;
};

type UserProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfileScreen'>;

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const navigation = useNavigation<UserProfileScreenNavigationProp>();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('UserProfileScreen', { userId: user._id })}>
      <Text style={styles.text}>{user.firstname} {user.lastname}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default UserListItem;
