import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


interface Post {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    price: number;
}

interface PostItemProps {
    post: Post;
    onPress: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(post.id)}>
            <Image source={{ uri: post.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description}>{post.description}</Text>
                <Text style={styles.price}>${post.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 16,
        color: '#333',
    },
});

export default PostItem;

