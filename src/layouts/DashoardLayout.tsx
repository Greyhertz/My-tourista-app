import { useAuth } from '@/context/AuthContext';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Ticket, Star, User, Settings,
  LogOut, Shield, Menu, Compass, ChevronRight, Wallet,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdmin } from '@/hooks/use-admin';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const pageVariants = {
  initial: { opacity: 0, y: 10  },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.16, ease: [0.25, 0.1, 0.25, 1] } },
};

const coreNav = [
  { icon: LayoutDashboard, label: 'Dashboard',   path: '/dashboard'          },
  { icon: Ticket,          label: 'My Bookings', path: '/dashboard/bookings' },
  { icon: Star,            label: 'My Reviews',  path: '/dashboard/reviews'  },
];
const accountNav = [
  { icon: User,     label: 'Profile',  path: '/dashboard/profile'  },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function UserDashboardLayout() {
  const { user, signOut }  = useAuth();
  const navigate           = useNavigate();
  const location           = useLocation();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [sheetOpen,  setSheetOpen ] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: profile } = useQuery<any>({
    queryKey: ['profile'],
    queryFn: () => api.get('/auth/profile'),
    enabled: !!user && !user.isAnonymous,
  });

  useEffect(() => {
    if (!user || user.isAnonymous) navigate('/signin');
  }, [user, navigate]);

  if (!user || user.isAnonymous) return null;

  const adminItems = isAdmin && !adminLoading
    ? [{ icon: Shield, label: 'Admin Panel', path: '/dashboard/admin' }]
    : [];

  const allNav = [...coreNav, ...accountNav, ...adminItems];
  const currentItem = allNav.find(item =>
    item.path === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(item.path)
  );

  const initials      = user.email?.slice(0, 2).toUpperCase() ?? 'U';
  const displayName   = user.displayName || user.email?.split('@')[0] || 'User';
  const totalBookings = profile?.account?.totalBookings ?? 0;
  const loyaltyPoints = profile?.account?.loyaltyPoints ?? 0;

  const handleLogout = async () => {
    try { setLoggingOut(true); setSheetOpen(false); await signOut(); navigate('/signin'); }
    finally { setLoggingOut(false); }
  };

  /* ── Nav Row ──────────────────────────────────────────── */
  function NavRow({ item, onNav, danger = false }: { item: any; onNav?: (() => void) | null; danger?: boolean }) {
    const active  = !danger && item === currentItem;
    const [hov, setHov] = useState(false);

    // Use CSS vars mapped to inline hsl() so we respect the theme
    // primary: hsl(231 48% 48%) — the blue from the design token
    const primaryHsl    = '231, 48%, 48%';
    const primaryLight  = `hsla(${primaryHsl}, 0.10)`;  // subtle bg
    const primaryMid    = `hsla(${primaryHsl}, 0.16)`;  // hover bg
    const primarySolid  = `hsl(${primaryHsl})`;          // icon bg when active
    const primaryText   = `hsl(231, 50%, 38%)`;          // dark label when active
    // logout uses a muted slate instead of red
    const logoutIcon    = 'hsl(231, 25%, 55%)';
    const logoutHovBg   = 'hsla(231, 48%, 48%, 0.08)';
    const logoutText    = 'hsl(231, 30%, 45%)';

    const bg = active ? primaryLight : hov ? (danger ? logoutHovBg : primaryMid) : 'transparent';
    const iconContainerBg = active ? primarySolid : danger
      ? (hov ? 'hsla(231,48%,48%,0.12)' : 'hsl(231,30%,94%)')
      : (hov ? primaryLight : 'hsl(220,20%,94%)');
    const iconColor = active ? '#fff' : danger
      ? (hov ? primarySolid : logoutIcon)
      : (hov ? primarySolid : 'hsl(215,20%,52%)');
    const textColor = active ? primaryText : danger
      ? (hov ? primarySolid : logoutText)
      : (hov ? 'hsl(231,30%,25%)' : 'hsl(215,20%,30%)');

    const inner = (
      <div
        className="flex items-center gap-3.5 px-3 py-3 rounded-2xl w-full cursor-pointer"
        style={{ background: bg, transition: 'background 0.17s ease' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={danger ? () => onNav?.() : undefined}
      >
        {/* Icon box */}
        <span
          className="flex shrink-0 items-center justify-center h-9 w-9 rounded-xl"
          style={{ background: iconContainerBg, transition: 'background 0.17s ease' }}
        >
          <item.icon
            className="h-[18px] w-[18px]"
            strokeWidth={active ? 2 : 1.6}
            style={{ color: iconColor, transition: 'color 0.17s ease' }}
          />
        </span>
        {/* Label */}
        <span style={{
          fontSize: 14.5,
          fontWeight: active ? 500 : 400,
          color: textColor,
          fontFamily: "'Sora', sans-serif",
          letterSpacing: '0.005em',
          flex: 1,
          transition: 'color 0.17s ease',
        }}>
          {item.label}
        </span>
        {active && (
          <ChevronRight
            className="h-4 w-4 shrink-0"
            strokeWidth={2.2}
            style={{ color: primarySolid, opacity: 0.7 }}
          />
        )}
      </div>
    );

    if (danger) return inner;
    return (
      <Link to={item.path} onClick={onNav} style={{ textDecoration: 'none', display: 'block' }}>
        {inner}
      </Link>
    );
  }

  /* ── Sidebar Body ─────────────────────────────────────── */
  const SidebarBody = ({ onNav }: { onNav?: () => void }) => {
    const primary = 'hsl(231, 48%, 48%)';
    const primaryGrad = 'linear-gradient(135deg, hsl(231,48%,52%), hsl(231,48%,42%))';

    return (
      <div className="flex flex-col h-full" style={{ fontFamily: "'Sora', sans-serif" }}>

        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
            style={{ background: primaryGrad, boxShadow: '0 4px 14px hsla(231,48%,48%,0.35)' }}
          >
            <Compass className="h-4.5 w-4.5 text-white" strokeWidth={1.5} />
          </div>
          <span style={{
            fontSize: 15,
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            background: primaryGrad,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            TravelMate
          </span>
        </div>

        <div style={{ height: 1, background: 'hsl(var(--border))', margin: '0 20px' }} />

        {/* User block */}
        <div className="flex flex-col items-center px-6 py-7 gap-4">

          <div className="relative">
            <Avatar
              className="h-20 w-20"
              style={{ boxShadow: `0 0 0 3px #fff, 0 0 0 5.5px hsla(231,48%,48%,0.25)` }}
            >
              <AvatarFallback style={{
                background: primaryGrad,
                color: '#fff',
                fontSize: 26,
                fontWeight: 300,
                letterSpacing: '0.04em',
              }}>
                {initials}
              </AvatarFallback>
            </Avatar>
            {user.emailVerified && (
              <span style={{
                position: 'absolute', bottom: 2, right: 2,
                background: primary,
                borderRadius: '50%', width: 20, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 9.5, fontWeight: 700, border: '2.5px solid #fff',
              }}>✓</span>
            )}
          </div>

          {/* Name */}
          <div className="text-center">
            <p style={{ fontSize: 16.5, fontWeight: 500, color: 'hsl(var(--foreground))', letterSpacing: '-0.015em' }}>
              {displayName}
            </p>
            <p style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))', fontWeight: 300, marginTop: 3, letterSpacing: '0.01em' }}>
              {user.email}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            {[
              { icon: Wallet, value: loyaltyPoints, label: 'Points'   },
              { icon: Ticket, value: totalBookings, label: 'Bookings' },
            ].map(s => (
              <div
                key={s.label}
                className="flex flex-col items-center py-3.5 rounded-2xl gap-1.5"
                style={{
                  background: 'hsl(var(--muted))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <s.icon className="h-4 w-4" strokeWidth={1.5} style={{ color: primary }} />
                <span style={{ fontSize: 17, fontWeight: 600, color: 'hsl(var(--foreground))', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontSize: 10.5, color: 'hsl(var(--muted-foreground))', fontWeight: 300, letterSpacing: '0.05em' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: 'hsl(var(--border))', margin: '0 20px' }} />

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', fontWeight: 400, padding: '0 12px 8px' }}>
            Navigate
          </p>
          <div className="space-y-0.5">
            {coreNav.map(item => <NavRow key={item.path} item={item} onNav={onNav} />)}
          </div>

          <div style={{ height: 1, background: 'hsl(var(--border))', margin: '14px 12px' }} />

          <p style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', fontWeight: 400, padding: '0 12px 8px' }}>
            Account
          </p>
          <div className="space-y-0.5">
            {[...accountNav, ...adminItems].map(item => <NavRow key={item.path} item={item} onNav={onNav} />)}
          </div>
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-5">
          <div style={{ height: 1, background: 'hsl(var(--border))', marginBottom: 10 }} />
          <NavRow
            item={{ icon: LogOut, label: loggingOut ? 'Signing out…' : 'Sign Out', path: '__logout' }}
            onNav={handleLogout}
            danger
          />
        </div>

      </div>
    );
  };

  /* ── Render ───────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600&display=swap');
        .dl-root, .dl-root * { font-family: 'Sora', sans-serif; }
        .dl-scroll::-webkit-scrollbar { width: 3px; }
        .dl-scroll::-webkit-scrollbar-track { background: transparent; }
        .dl-scroll::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 99px; }
      `}</style>

      <div className="dl-root flex h-screen w-full overflow-hidden bg-background">

        {/* Desktop sidebar */}
        <aside
          className="dl-scroll hidden lg:block h-full overflow-y-auto shrink-0"
          style={{
            width: 300,
            background: 'hsl(var(--card))',
            borderRight: '1px solid hsl(var(--border))',
            boxShadow: '4px 0 28px rgba(0,0,0,0.05)',
          }}
        >
          <SidebarBody />
        </aside>

        {/* Main column */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Top bar */}
          <header
            className="flex items-center justify-between px-5 lg:px-8 py-4 sticky top-0 z-20"
            style={{
              background: 'hsl(var(--card) / 0.96)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderBottom: '1px solid hsl(var(--border))',
              minHeight: 64,
            }}
          >
            <div className="flex items-center gap-4">

              {/* Mobile trigger */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl"
                    style={{ background: 'hsl(var(--muted))', border: 'none', cursor: 'pointer' }}
                  >
                    <Menu className="h-5 w-5" strokeWidth={1.5} style={{ color: 'hsl(var(--foreground))' }} />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="p-0 overflow-y-auto dl-scroll"
                  style={{
                    width: 300,
                    background: 'hsl(var(--card))',
                    border: 'none',
                    boxShadow: '6px 0 40px rgba(0,0,0,0.12)',
                  }}
                >
                  <SidebarBody onNav={() => setSheetOpen(false)} />
                </SheetContent>
              </Sheet>

              <div>
                <h1 style={{ fontSize: 20, fontWeight: 500, color: 'hsl(var(--foreground))', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {currentItem?.label ?? 'Dashboard'}
                </h1>
                <p style={{ fontSize: 12.5, color: 'hsl(var(--muted-foreground))', fontWeight: 300, marginTop: 2 }}>
                  Welcome back,{' '}
                  <span style={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}>{displayName}</span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {!user.emailVerified && (
                <Badge variant="secondary" className="hidden sm:flex text-[11px] font-[300] tracking-wide rounded-full px-3 py-1">
                  Unverified
                </Badge>
              )}
              <button onClick={() => navigate('/dashboard/profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Avatar className="h-9 w-9" style={{ boxShadow: '0 0 0 2.5px hsla(231,48%,48%,0.3)' }}>
                  <AvatarFallback style={{
                    background: 'linear-gradient(135deg, hsl(231,48%,52%), hsl(231,48%,42%))',
                    color: '#fff', fontSize: 13, fontWeight: 500,
                  }}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 dl-scroll overflow-y-auto bg-background">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-5 lg:p-8"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>
    </>
  );
}