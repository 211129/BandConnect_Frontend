import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { listPostsUseCase } from '../../dependencies'; // Asegúrate de que la ruta sea correcta
import { firebaseAuth } from '../../../../../config/firebase.config';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

type ListPostsScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const ListPostsScreen: React.FC<ListPostsScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const loadedPosts = await listPostsUseCase.execute();
      setPosts(loadedPosts);
    };
    fetchPosts();
  }, []);

  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetailsScreen', { postId });
  };

  const handleCategoryPress = (category: string) => {
    // Filtrar o navegar según la categoría
    console.log(`Filtrar por categoría: ${category}`);
  };

  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'PreLoginScreen' }],
      });
    });
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity style={styles.postItem} onPress={() => handlePostPress(item.id)}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPostItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <View style={styles.categoriesContainer}>
            {['Tecladista', 'DJ', 'Norteño', 'Marimba', 'Sierreño', 'Banda'].map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category)}
              >
                <View style={styles.categoryImagePlaceholder} />
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreatePostScreen')}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ListChatScreen')}>
          <Ionicons name="chatbubble" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000', // Fondo negro
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  postItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  postTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  postPrice: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  searchButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryText: {
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#ff0000',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    fontSize: 24,
  },
});

export default ListPostsScreen;
