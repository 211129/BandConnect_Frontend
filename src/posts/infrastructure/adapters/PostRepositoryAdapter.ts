import { IPostRepositoryPort } from '../../application/ports/IPostRepositoryPort';
import PostEntity from '../../domain/entities/PostEntity';
import firestore from '@react-native-firebase/firestore';

class PostRepositoryAdapter implements IPostRepositoryPort {
  async createPost(post: PostEntity): Promise<PostEntity> {
    const docRef = await firestore().collection('posts').add({
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      category: post.category,
      price: post.price,
      timestamp: post.timestamp,
      userId: post.userId
    });
    return new PostEntity(docRef.id, post.title, post.description, post.imageUrl, post.category, post.price, new Date(), post.userId);
  }

  async listPosts(): Promise<PostEntity[]> {
    const snapshot = await firestore().collection('posts').get();
    return snapshot.docs.map(doc => new PostEntity(doc.id, doc.data().title, doc.data().description, doc.data().imageUrl, doc.data().category, doc.data().price, doc.data().timestamp.toDate(), doc.data().userId));
  }

  async updatePost(postId: string, post: Partial<PostEntity>): Promise<void> {
    await firestore().collection('posts').doc(postId).update(post);
  }

  async deletePost(postId: string): Promise<void> {
    await firestore().collection('posts').doc(postId).delete();
  }
}

export default PostRepositoryAdapter;