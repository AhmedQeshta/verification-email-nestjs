import { Body, Controller, Get, Post } from '@nestjs/common';
import { Post as Posts } from './post.entity';
import { PostsService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getPosts(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Post()
  async addPosts(
    @Body('title') postTitle: string,
    @Body('description') postDesc: string,
  ) {
    const post = await this.postService.store(postTitle, postDesc);
    return { post, message: 'Post added successfully.' };
  }
}
