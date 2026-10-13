import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { UserRole, AdminUserPayload } from '@/lib/auth-token';

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

const SALT_ROUNDS = 10;
const USERS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'admin-users.json');

// Initialize default fallback users with bcrypt hashes
const DEFAULT_USERS: AdminUserRecord[] = [
  {
    id: 'usr-admin-01',
    email: 'admin@enterprisechronicle.com',
    name: 'Julian Vance-Stowe (Admin)',
    role: 'admin',
    passwordHash: bcrypt.hashSync('Admin@2026!Sec', SALT_ROUNDS),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'usr-editor-02',
    email: 'editor@enterprisechronicle.com',
    name: 'Elena Rostova (Senior Editor)',
    role: 'editor',
    passwordHash: bcrypt.hashSync('Editor@2026!Sec', SALT_ROUNDS),
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-01-05T00:00:00.000Z',
  },
  {
    id: 'usr-author-03',
    email: 'author@enterprisechronicle.com',
    name: 'Harrison Sterling (Contributing Author)',
    role: 'author',
    passwordHash: bcrypt.hashSync('Author@2026!Sec', SALT_ROUNDS),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01T00:00:00.000Z',
  },
];

function loadUsersFromDisk(): AdminUserRecord[] {
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load admin users from disk:', err);
  }
  return [...DEFAULT_USERS];
}

function saveUsersToDisk(users: AdminUserRecord[]) {
  try {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save admin users to disk:', err);
  }
}

// In-memory store initialized from disk or defaults
let usersStore: AdminUserRecord[] = loadUsersFromDisk();

// Check for custom credentials provided via environment variables (e.g. .env.local)
const envAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const envAdminPassword = process.env.ADMIN_PASSWORD?.trim();
const envAdminName = process.env.ADMIN_NAME?.trim() || 'Super Administrator';

if (envAdminEmail && envAdminPassword) {
  const existingIdx = usersStore.findIndex((u) => u.email.toLowerCase() === envAdminEmail);
  const hashedPw = bcrypt.hashSync(envAdminPassword, SALT_ROUNDS);
  if (existingIdx >= 0) {
    usersStore[existingIdx].passwordHash = hashedPw;
    usersStore[existingIdx].role = 'admin';
  } else {
    usersStore.unshift({
      id: `usr-env-admin`,
      email: envAdminEmail,
      name: envAdminName,
      role: 'admin',
      passwordHash: hashedPw,
      createdAt: new Date().toISOString(),
    });
  }
  saveUsersToDisk(usersStore);
}

// ==========================================
// Rate Limiter for Login Protection
// ==========================================
interface RateLimitEntry {
  attempts: number;
  blockedUntil: number | null;
}

const loginRateLimits = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkLoginRateLimit(key: string): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const entry = loginRateLimits.get(key);

  if (!entry) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (entry.blockedUntil && entry.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds,
    };
  }

  // Reset if block duration has passed
  if (entry.blockedUntil && entry.blockedUntil <= now) {
    loginRateLimits.delete(key);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  return {
    allowed: entry.attempts < MAX_ATTEMPTS,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - entry.attempts),
  };
}

export function recordFailedLogin(key: string): { remainingAttempts: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = loginRateLimits.get(key) || { attempts: 0, blockedUntil: null };
  entry.attempts += 1;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_DURATION_MS;
    loginRateLimits.set(key, entry);
    return {
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil(BLOCK_DURATION_MS / 1000),
    };
  }

  loginRateLimits.set(key, entry);
  return {
    remainingAttempts: MAX_ATTEMPTS - entry.attempts,
  };
}

export function resetLoginRateLimit(key: string): void {
  loginRateLimits.delete(key);
}

// ==========================================
// User Operations & Verification
// ==========================================
export async function authenticateUser(email: string, plainPassword: string): Promise<AdminUserRecord | null> {
  const users = loadUsersFromDisk();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(plainPassword, user.passwordHash);
  if (!isValid) {
    return null;
  }

  // Record last login
  user.lastLogin = new Date().toISOString();
  saveUsersToDisk(users);
  return user;
}

export function getUsersList(): Omit<AdminUserRecord, 'passwordHash'>[] {
  const users = loadUsersFromDisk();
  return users.map(({ passwordHash: _, ...rest }) => rest);
}

export async function createUser(data: {
  email: string;
  name: string;
  role: UserRole;
  password: string;
}): Promise<Omit<AdminUserRecord, 'passwordHash'>> {
  const users = loadUsersFromDisk();
  const existing = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase().trim());
  if (existing) {
    throw new Error('A user with this email address already exists.');
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
  const newUser: AdminUserRecord = {
    id: `usr-${Date.now()}`,
    email: data.email.trim().toLowerCase(),
    name: data.name.trim(),
    role: data.role,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsersToDisk(users);
  const { passwordHash: _, ...safeUser } = newUser;
  return safeUser;
}

export function deleteUser(id: string): boolean {
  const users = loadUsersFromDisk();
  const initialLen = users.length;
  // Prevent deleting the primary admin
  const filtered = users.filter((u) => u.id !== id || u.email === 'admin@enterprisechronicle.com');
  const wasDeleted = filtered.length < initialLen;
  if (wasDeleted) {
    saveUsersToDisk(filtered);
  }
  return wasDeleted;
}

// ==========================================
// Role-Based Permissions Checking
// ==========================================
export type PermissionAction =
  | 'manage_users'
  | 'manage_settings'
  | 'reset_seed'
  | 'publish_article'
  | 'edit_article'
  | 'create_article'
  | 'delete_article'
  | 'upload_media';

export function hasPermission(role: UserRole, action: PermissionAction): boolean {
  switch (role) {
    case 'admin':
      return true; // Admin has complete access
    case 'editor':
      return [
        'publish_article',
        'edit_article',
        'create_article',
        'delete_article',
        'upload_media',
      ].includes(action);
    case 'author':
      return ['create_article', 'edit_article'].includes(action);
    default:
      return false;
  }
}
