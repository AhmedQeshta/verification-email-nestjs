import { Injectable, Inject } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { checkToken, generateToken } from 'src/utils';
import sendEmail from 'src/utils/email';
import verifyEmail from 'src/utils/email/templates/verifyEmail';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async store(email: string, password: string) {
    // Check if the gym already exists
    const isExist = await User.findOne({
      where: { email },
    });
    // if is exist throw an error
    if (isExist) throw new Error('Sorry, This Email is already exist');

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create<User>({
      email,
      password: hashedPassword,
    });

    const { id } = user;

    const payload = {
      id,
      email,
    };

    // Generate the token

    const token = await generateToken(payload, {
      expiresIn: '0.5h',
      algorithm: 'HS256',
    });

    const html = verifyEmail(
      `${process.env.BASE_URL}users/verify/${id}/${token}`,
    );
    sendEmail(email, 'Verify Your Email', html);

    return user;
  }

  async verify(id: number, token: string) {
    try {
      const user = await User.findByPk(id);

      if (!user) throw new Error('User not found');

      const tokenChecked = await checkToken(token);
      if (!tokenChecked) throw new Error('Sorry, Invalid link');

      await user.update({ isVerified: true });
    } catch (error) {
      throw new Error('User not found');
    }
  }
}
