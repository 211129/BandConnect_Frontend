import IPostRepositoryPort from '../ports/IPostRepositoryPort';

export class DeletePostUseCase {
  private postRepository: IPostRepositoryPort;

  constructor(postRepository: IPostRepositoryPort) {
    this.postRepository = postRepository;
  }

  async execute(postId: string): Promise<void> {
    await this.postRepository.deletePost(postId);
  }
}   

export default DeletePostUseCase;