import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'accent' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'accent', className, children, ...props }, ref) => {
    const variantClasses: Record<BadgeVariant, string> = {
      accent: 'bg-accent-500/10 text-accent-400',
      neutral: 'bg-neutral-700 text-neutral-300',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-block px-3 py-1 rounded-full text-sm font-medium',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
