import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';

type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfileScreen'>;

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#cb0000" />
      </TouchableOpacity>
      <Text style={styles.text}>Edit Profile Screen</Text>
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
    backgroundColor: '#cb0000',
    borderRadius: 20,
    padding: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default EditProfileScreen;
