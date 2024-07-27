import IPostRepositoryPort from '../ports/IPostRepositoryPort';
import PostEntity from '../../domain/entities/PostEntity';

export class CreatePostUseCase {
  private postRepository: IPostRepositoryPort;

  constructor(postRepository: IPostRepositoryPort) {
    this.postRepository = postRepository;
  }

  async execute(post: PostEntity): Promise<PostEntity> {
    return this.postRepository.createPost(post);
  }
}

export default CreatePostUseCase;