import { Sequelize } from 'sequelize-typescript';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('env2')('.env');

import { User } from '../module/users/user.entity';
import { Post } from '../module/posts/post.entity';

const { NODE_ENV, DB_URL, TEST_DB_URL, DATABASE_URL, DB_BUILD } = process.env;

let dbUrl = '';
let ssl: boolean | object = false;

switch (NODE_ENV) {
  case 'development':
    dbUrl = DB_URL;
    ssl = false;
    break;
  case 'test':
    dbUrl = TEST_DB_URL;
    ssl = false;
    break;
  case 'production':
    dbUrl = DATABASE_URL;
    ssl = { rejectUnauthorized: false };
    break;
  default:
    throw new Error('NODE_ENV is not set');
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dbUrl, {
        dialect: 'postgres',
        dialectOptions: { ssl, charset: 'utf8' },
        logging: false,
      });
      sequelize.addModels([User, Post]);
      if (!DB_BUILD) {
        await sequelize.sync();
      }
      return sequelize;
    },
  },
];
