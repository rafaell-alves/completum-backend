import { UserResponse } from '../dto/user';
import { env } from 'process';
import jsonwebtoken from 'jsonwebtoken';

export class TokenService {
  generateToken(user: UserResponse): string {
    // Remover dados sensíveis antes de gerar o token
    const userData = { id: user.id, email: user.email, name: user.name };
    return jsonwebtoken.sign(
      { user: JSON.stringify(userData) },
      env.PRIVATE_KEY || 'default_secret',
      { expiresIn: env.JWT_EXPIRATION || '1h' },
    );
  }
}
