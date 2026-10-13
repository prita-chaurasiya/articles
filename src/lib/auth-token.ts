import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE_NAME = 'admin_session_token';
export const JWT_SECRET_STRING =
  process.env.ADMIN_JWT_SECRET ||
  'enterprise-chronicle-super-secure-jwt-secret-key-2026-production-token-928471';

const secretKey = new TextEncoder().encode(JWT_SECRET_STRING);

export type UserRole = 'admin' | 'editor' | 'author';

export interface AdminUserPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface DecodedAdminToken extends AdminUserPayload {
  iat: number;
  exp: number;
}

/**
 * Creates a signed JWT session token valid for 24 hours.
 */
export async function createSessionToken(user: AdminUserPayload): Promise<string> {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

/**
 * Verifies a signed JWT session token.
 * Returns null if token is invalid or expired.
 */
export async function verifySessionToken(token: string): Promise<DecodedAdminToken | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as DecodedAdminToken;
  } catch {
    return null;
  }
}
