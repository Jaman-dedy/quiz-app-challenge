import { Session } from 'src/session/entities/session.entity';
import { UserEntity } from '../../../users/entities/user.entity';

export type JwtPayloadType = Pick<UserEntity, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
