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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4 relative">
      {/* Language Toggle */}
      <div className={cn("absolute top-4", isRTL ? "left-4" : "right-4")}>
        <LanguageToggle />
      </div>
      
      <div className="w-full max-w-md">
        <div className={cn("flex items-center justify-center mb-8", isRTL && "flex-row-reverse")}>
          <Building2 className="h-12 w-12 text-primary" />
          <span className={cn("text-3xl font-bold text-foreground", isRTL ? "mr-3" : "ml-3")}>
            {t('appName')}
          </span>
        </div>

        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('welcomeBack')}</CardTitle>
            <CardDescription>
              {t('signInToAccess')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <Shield className="h-4 w-4" />
                  {t('admin')}
                </TabsTrigger>
                <TabsTrigger value="vendor" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <User className="h-4 w-4" />
                  {t('vendor')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="admin" className="space-y-4 mt-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {t('adminPortalAccess')}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="vendor" className="space-y-4 mt-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <User className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {t('vendorPortalAccess')}
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={activeTab === 'admin' ? 'admin@example.com' : 'vendor@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(isRTL && "text-right")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(isRTL && "text-right")}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-200" 
                disabled={isLoading}
              >
                {isLoading ? t('signingIn') : t('signIn')}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>{t('demoCredentials')}:</p>
              <p>{t('password')}: <code className="bg-muted px-1 rounded">password</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}