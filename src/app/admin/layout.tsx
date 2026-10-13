import type { Metadata } from 'next';
import { AdminAuthProvider } from './AdminAuthContext';

export const metadata: Metadata = {
  title: 'Admin Studio & CMS | The Enterprise Chronicle',
  description: 'Enterprise editorial management system with role-based access control.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-[#F8FAFC]">
        {children}
      </div>
    </AdminAuthProvider>
  );
}
