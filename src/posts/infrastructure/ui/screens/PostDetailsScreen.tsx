import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';
import { listPostsUseCase } from '../../../../posts/infrastructure/dependencies';

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetailsScreen'>;

type PostDetailsScreenProps = {
  route: PostDetailsScreenRouteProp;
};

const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const allPosts = await listPostsUseCase.execute();
      const foundPost = allPosts.find((p: Post) => p.id === postId);
      setPost(foundPost ?? null);
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Loading post details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.price}>${post.price.toFixed(2)}</Text>
      <Button title="Enviar mensaje" onPress={() => console.log('Enviar mensaje')} />
      <Button title="Guardar en favoritos" onPress={() => console.log('Guardar en favoritos')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ccc',
  },
  price: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default PostDetailsScreen;
