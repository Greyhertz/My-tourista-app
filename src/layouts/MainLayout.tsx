// layouts/MainLayout.tsx
import type { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/core/Navbar';
import ScrollButton from '@/components/core/Scroll';
import Footer from '@/components/core/Footer';
import { Toaster } from 'sonner';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle route transitions with loading effect for ALL navigation types
  useEffect(() => {
    setIsTransitioning(true);

    // Scroll to top immediately for any navigation (including back/forward)
    window.scrollTo(0, 0);

    // Show loading for at least 2 seconds
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 5000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, [location.pathname, location.key]); // Added location.key to catch back/forward navigation

  // Also handle browser back/forward buttons specifically
  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-delay-100 { animation-delay: 0.1s; animation-fill-mode: both; }
        .animate-delay-200 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animate-delay-300 { animation-delay: 0.3s; animation-fill-mode: both; }
        .animate-delay-400 { animation-delay: 0.4s; animation-fill-mode: both; }

        /* Facebook-style skeleton loading */
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Pulse dots animation */
        .pulse-dots {
          display: flex;
          gap: 8px;
        }

        .pulse-dot {
          width: 12px;
          height: 12px;
          background: #3498db;
          border-radius: 50%;
          animation: pulse 1.4s infinite ease-in-out both;
        }

        .pulse-dot:nth-child(1) { animation-delay: -0.32s; }
        .pulse-dot:nth-child(2) { animation-delay: -0.16s; }
        .pulse-dot:nth-child(3) { animation-delay: 0s; }

        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Wave animation */
        .wave {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .wave-bar {
          width: 6px;
          background: #3498db;
          border-radius: 3px;
          animation: wave 1.2s infinite ease-in-out;
        }

        .wave-bar:nth-child(1) { height: 20px; animation-delay: -1.1s; }
        .wave-bar:nth-child(2) { height: 30px; animation-delay: -1.0s; }
        .wave-bar:nth-child(3) { height: 25px; animation-delay: -0.9s; }
        .wave-bar:nth-child(4) { height: 35px; animation-delay: -0.8s; }
        .wave-bar:nth-child(5) { height: 20px; animation-delay: -0.7s; }

        @keyframes wave {
          0%, 40%, 100% { transform: scaleY(0.4); }
          20% { transform: scaleY(1.0); }
        }

        /* Loading page styles */
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {isTransitioning ? (
        // Full-screen loading state - NO navbar or footer
        <div className="loading-container animate-fade-in">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4  bg-gradient-to-b from-amber-400 via-rose-500 to-fuchsia-600  border-transparent"></div>
            <p className="text-gray-600 text-lg font-medium">
              Loading{' '}
              {location.pathname === '/'
                ? 'home page'
                : location.pathname.replace(/[-\/]/g, ' ')}
               <div className="pulse-dots  flex justify-center">
                <div className="pulse-dot"></div>
                <div className="pulse-dot"></div>
                <div className="pulse-dot"></div>
              </div>
            </p>
            <p className="text-gray-400 text-sm mt-2">Please wait</p>
          </div>
        </div>
      ) : (
        // Normal layout with navbar and footer
        <div className="min-h-screen bg-background text-foreground animate-fade-in">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="">
            <div className="animate-fade-in-up">{children || <Outlet />}</div>
          </main>

          <Toaster />

          {/* Footer and Scroll Button */}
          <ScrollButton />
          <Footer />
        </div>
      )}
    </>
  );
}
