// layouts/MainLayout.tsx
import type { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar, { MainNav } from './Navbar';
import ScrollButton from '@/components/core/Scroll';
import Footer from './Footer';
import { Toaster } from 'sonner';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get page name from pathname
  const getPageName = (pathname: string) => {
    const path = pathname.replace('/', '');
    if (!path) return 'Home';

    // Convert path to readable name
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const currentPageName = getPageName(location.pathname);

  useEffect(() => {
    // Skip loading animation for home page
    if (location.pathname === '/' || location.pathname === '') {
      setIsTransitioning(false);
      window.scrollTo(0, 0);
      return;
    }

    // Show loading for other pages
    setIsTransitioning(true);

    // Scroll to top immediately for any navigation (including back/forward)
    window.scrollTo(0, 0);

    // Show loading for at least 2 seconds
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, location.key]);

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

        /* Facebook-style skeleton loading - theme aware */
        .skeleton {
        background: linear-gradient(90deg, 
          hsl(var(--muted)) 25%, 
          hsl(var(--muted-foreground) / 0.2) 75%, 
          hsl(var(--muted)) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
}
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Pulse dots animation - theme aware */
        .pulse-dots {
          display: flex;
          gap: 8px;
        }

        .pulse-dot {
          width: 12px;
          height: 12px;
          background: hsl(var(--primary));
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

        /* Wave animation - theme aware */
        .wave {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .wave-bar {
          width: 6px;
          background: hsl(var(--primary));
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
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {isTransitioning ? (
        // Simple full-screen skeleton
        <div className="loading-container animate-fade-in">
          <div className="w-full h-full">
            {/* Simple header bar */}
            <div className="w-full h-16 bg-gray-200 skeleton mb-4"></div>

            {/* Main content area */}
            <div
              className="w-full flex-1 bg-gray-100 skeleton"
              style={{ height: 'calc(100vh - 140px)' }}
            ></div>

            {/* Simple footer bar */}
            <div className="w-full h-12 bg-gray-200 skeleton mt-4"></div>

            {/* Loading indicator with page name */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="bg-background rounded-lg px-8 py-6 shadow-xl border flex items-center space-x-4">
                <div className="pulse-dots">
                  <div className="pulse-dot"></div>
                  <div className="pulse-dot"></div>
                  <div className="pulse-dot"></div>
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground font-semibold text-lg">
                    Loading {currentPageName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Please wait a moment...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Normal layout with navbar and footer
        <div className="min-h-screen bg-background text-foreground animate-fade-in">
          {/* Navbar */}
          <MainNav />
          <Navbar />

          {/* Main Content */}
          <main className="">
            <div className="animate-fade-in-up">{children || <Outlet />}</div>
          </main>

          <Toaster />

          {/* Footer and Scroll Button */}
          <ScrollButton />
            <Footer />
            <Toaster />
        </div>
      ) }
      
    </>
    
  );
}
