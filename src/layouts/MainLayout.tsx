// layouts/MainLayout.tsx
import type { ReactNode } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Navbar from '../components/core/Navbar';
import ScrollButton from '@/components/core/Scroll';
import Footer from '@/components/core/Footer';
import { Toaster } from 'sonner';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* Global Animation Styles */}
        <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-delay-100 { animation-delay: 0.1s; animation-fill-mode: both; }
        .animate-delay-200 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animate-delay-300 { animation-delay: 0.3s; animation-fill-mode: both; }
        .animate-delay-400 { animation-delay: 0.4s; animation-fill-mode: both; }
      `}</style>

        <div className="min-h-screen bg-background text-foreground">
          {/* Separate Navbar Component */}
          <Navbar />

          {/* Main Content with proper spacing for fixed navbar */}
          <main className="pt-16 lg:pt-20 min-h-screen">
            {/* Content Container with Animation */}
            <div className="animate-fade-in-up">{children || <Outlet />}</div>
          </main>
          <Toaster />

          {/* Animated Footer */}
          <ScrollButton />
        </div>

        <Footer />
      </body>
    </html>
  );
}
