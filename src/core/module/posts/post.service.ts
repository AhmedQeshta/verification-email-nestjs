import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POSTS_REPOSITORY')
    private postsRepository: typeof Post,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.findAll<Post>();
  }

  async store(title: string, description: string) {
    return await this.postsRepository.create<Post>({ title, description });
  }
}
