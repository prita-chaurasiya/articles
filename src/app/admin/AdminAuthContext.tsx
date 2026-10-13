'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserRole } from '@/lib/auth-token';

export interface AdminAuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AdminAuthContextType {
  user: AdminAuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  hasPermission: (action: string) => boolean;
  refreshSession: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminAuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/admin/auth/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
        if (!isLoginPage) {
          router.replace('/admin/login');
        }
      }
    } catch {
      setUser(null);
      if (!isLoginPage) {
        router.replace('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [pathname]);

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setUser(null);
      router.replace('/admin/login');
    }
  };

  const hasPermission = (action: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'editor') {
      return [
        'publish_article',
        'edit_article',
        'create_article',
        'delete_article',
        'upload_media',
      ].includes(action);
    }
    if (user.role === 'author') {
      return ['create_article', 'edit_article'].includes(action);
    }
    return false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        logout,
        hasPermission,
        refreshSession: fetchSession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
