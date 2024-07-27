import React from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import PostInput from '../components/PostInput';
import { createPostUseCase } from '../../dependencies';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import PostEntity from '../../../domain/entities/PostEntity';

// Definir la estructura del objeto post
interface PostData {
  title: string;
  description: string;
  fileUri: string;
  fileType: string;
  category: string;
  price: number;
  timestamp: Date;
  userId: string;
}

// Definir los tipos para las props del componente de la pantalla
type CreatePostScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ navigation }) => {
  const handleCreatePost = async (postData: PostData) => {
    try {
      const { fileUri, fileType, ...postDetails } = postData;
      const fileUrl = await uploadFileToFirebase(fileUri, fileType);

      const newPost = new PostEntity(
        '',
        postData.title,
        postData.description,
        fileUrl,
        postData.category,
        postData.price,
        postData.timestamp,
        postData.userId
      );

      await createPostUseCase.execute(newPost);
      navigation.goBack();
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
      Alert.alert('Failed to create post:', errorMessage);
    }
  };

  const uploadFileToFirebase = async (fileUri: string, fileType: string): Promise<string> => {
    const filename = uuid.v4(); // Usar react-native-uuid para generar un UUID
    const reference = storage().ref(`posts/${filename}`);
    await reference.putFile(fileUri);
    return await reference.getDownloadURL();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <PostInput onSubmit={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
});

export default CreatePostScreen;
