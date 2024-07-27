import PostEntity from '../../domain/entities/PostEntity';

export interface IPostRepositoryPort {
  createPost(post: PostEntity): Promise<PostEntity>;
  listPosts(): Promise<PostEntity[]>;
  updatePost(postId: string, post: Partial<PostEntity>): Promise<void>;
  deletePost(postId: string): Promise<void>;
}

export default IPostRepositoryPort;