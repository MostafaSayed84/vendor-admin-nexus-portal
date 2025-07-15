import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'EN' : 'العربية'}
      </span>
    </Button>
  );
}