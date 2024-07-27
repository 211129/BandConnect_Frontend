import PostRepositoryAdapter from '../../posts/infrastructure/adapters/PostRepositoryAdapter';
import { CreatePostUseCase} from '../../posts/application/use-cases/CreatePostUseCase';
import {ListPostsUseCase} from '../../posts/application/use-cases/ListPostsUseCase';
import {UpdatePostUseCase} from '../../posts/application/use-cases/UpdatePostUseCase';
import {DeletePostUseCase} from '../../posts/application/use-cases/DeletePostUseCase';
import IPostRepositoryPort from '../application/ports/IPostRepositoryPort';

const postRepository: IPostRepositoryPort = new PostRepositoryAdapter();

const createPostUseCase = new CreatePostUseCase(postRepository);
const listPostsUseCase = new ListPostsUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);

export {
  createPostUseCase,
  listPostsUseCase,
  updatePostUseCase,
  deletePostUseCase
};
