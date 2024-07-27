import IPostRepositoryPort from '../ports/IPostRepositoryPort';
import PostEntity from '../../domain/entities/PostEntity';

export class ListPostsUseCase {
  private postRepository: IPostRepositoryPort;

  constructor(postRepository: IPostRepositoryPort) {
    this.postRepository = postRepository;
  }

  async execute(): Promise<PostEntity[]> {
    return this.postRepository.listPosts();
  }
}

export default ListPostsUseCase;