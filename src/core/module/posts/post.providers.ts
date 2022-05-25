import { Post } from './post.entity';

export const PostsProviders = [
  {
    provide: 'POSTS_REPOSITORY',
    useValue: Post,
  },
];
