import { useState } from 'react';
import { useAuth, UserRole } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Shield, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/components/LanguageContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<UserRole>('admin');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, activeTab);
      toast({
        title: t('loginSuccessful'),
        description: t('welcomeToPortal', { role: t(activeTab) }),
      });
    } catch (error) {
      toast({
        title: t('loginFailed'),
        description: t('invalidCredentials'),
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as UserRole);
    // Reset form when switching tabs
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Language Toggle */}
      <div className={cn("absolute top-6", isRTL ? "left-6" : "right-6")}>
        <LanguageToggle />
      </div>
      
      <div className="w-full max-w-lg">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-6">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Vendor Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-card">
          <CardContent className="p-8">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <Button
                type="button"
                variant={activeTab === 'admin' ? 'default' : 'outline'}
                className={cn(
                  "h-14 text-lg font-medium transition-all duration-200",
                  activeTab === 'admin' 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-background text-foreground hover:bg-accent"
                )}
                onClick={() => handleTabChange('admin')}
              >
                <Shield className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                Admin
              </Button>
              <Button
                type="button"
                variant={activeTab === 'vendor' ? 'default' : 'outline'}
                className={cn(
                  "h-14 text-lg font-medium transition-all duration-200",
                  activeTab === 'vendor' 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-background text-foreground hover:bg-accent"
                )}
                onClick={() => handleTabChange('vendor')}
              >
                <Building2 className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                Vendor
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    "h-14 text-base border-input bg-background",
                    isRTL && "text-right"
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    "h-14 text-base border-input bg-background",
                    isRTL && "text-right"
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 rounded-xl" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 text-center">
              <p className="text-lg font-medium text-muted-foreground mb-4">
                Demo Credentials:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-accent rounded-xl border">
                  <p className="font-semibold text-foreground text-lg">Admin Demo</p>
                  <p className="text-sm text-muted-foreground mt-1">admin@demo.com</p>
                </div>
                <div className="p-4 bg-accent rounded-xl border">
                  <p className="font-semibold text-foreground text-lg">Vendor Demo</p>
                  <p className="text-sm text-muted-foreground mt-1">vendor@demo.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Password: <code className="bg-muted px-2 py-1 rounded font-mono">password</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}