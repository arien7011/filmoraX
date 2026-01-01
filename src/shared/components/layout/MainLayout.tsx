import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/shared/utils';

interface MainLayoutProps {
  children?: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

export function MainLayout({ children, showFooter = true, className }: MainLayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col bg-[var(--color-background)]', className)}>
      <Header />
      <main className="flex-1 pt-16">
        {children ?? <Outlet />}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
