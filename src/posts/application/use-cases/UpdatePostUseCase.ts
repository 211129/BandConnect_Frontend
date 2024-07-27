import IPostRepositoryPort from '../ports/IPostRepositoryPort';
import PostEntity from '../../domain/entities/PostEntity';

export class UpdatePostUseCase {
  private postRepository: IPostRepositoryPort;

  constructor(postRepository: IPostRepositoryPort) {
    this.postRepository = postRepository;
  }

  async execute(postId: string, post: Partial<PostEntity>): Promise<void> {
    await this.postRepository.updatePost(postId, post);
  }
}

export default UpdatePostUseCase;