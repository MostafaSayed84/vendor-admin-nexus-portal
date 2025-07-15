import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background transition-all duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background to-secondary/20">
        <div className="p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}