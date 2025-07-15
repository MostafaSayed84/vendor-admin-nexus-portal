import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover-shadow-card group animate-fade-in border-0 shadow-elegant",
      className
    )}>
      <CardContent className="p-6 gradient-card">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
            {trend && (
              <div className="flex items-center space-x-1">
                <div className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  trend.isPositive 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                )}>
                  <span className="mr-1">
                    {trend.isPositive ? '↗' : '↘'}
                  </span>
                  {Math.abs(trend.value)}%
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-7 w-7 text-primary transition-all duration-300 group-hover:text-primary-glow" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}