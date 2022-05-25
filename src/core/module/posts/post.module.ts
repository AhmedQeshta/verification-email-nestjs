import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './post.service';
import { PostsProviders } from './post.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PostsService, ...PostsProviders],
})
export class PostsModule {}
