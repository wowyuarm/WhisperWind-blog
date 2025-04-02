import React from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function LeafIcon({ className, ...props }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("text-emerald-600", className)} 
      {...props}
    >
      <path d="M21 3L9 15" />
      <path d="M15 3L9 9" />
      <path d="M21 9L15 15" />
      <path d="M3 21c5.4-5.4 6-10.6 6-17v17" />
      <path d="M12 15c-1.3 1.3-2 3.7-2 6" />
    </svg>
  );
}

export function CloudIcon({ className, ...props }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("text-sky-500", className)} 
      {...props}
    >
      <path d="M7 14.5c1.7 1 3.7 1 5.5 0" />
      <path d="M18.18 8.61a5 5 0 1 0 1.82 8.89c2-1 3-3.39 3-5.5s-1-4.5-3-5.5c-2.67-1.33-5.67 0-7 2" />
      <path d="M15.58 8.61c0 .84.27 1.67.82 2.4a5 5 0 1 0-6.9.4c1.3 1.5 3 1.8 4.85 1" />
      <path d="M7 15.1c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2" />
    </svg>
  );
}

export function TreeIcon({ className, ...props }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("text-green-700", className)} 
      {...props}
    >
      <path d="M12 22v-7l-2 2" />
      <path d="M17 8c.413 0 .8.1 1.143.275"  />
      <path d="M9.5 14.5c.322 0 .644-.084.929-.247" />
      <path d="M6.5 8a2.5 2.5 0 0 1 3.256-2.39" />
      <path d="M2 13c0-3.111 2.667-4.867 5-3m2-7a3 3 0 0 1 0 6h-1.5m1.5 5c0-1.857 1.6-3 3-3 2.4 0 3 1.2 3 3 0 2-1 3-3 3" />
    </svg>
  );
}

export function SunflowerIcon({ className, ...props }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("text-amber-500", className)} 
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M5.635 5.635l2.122 2.122" />
      <path d="M16.243 16.243l2.122 2.122" />
      <path d="M5.635 18.364l2.122-2.122" />
      <path d="M16.243 7.757l2.122-2.122" />
      <path d="M6 16c.667-1 2.2-3 6-3s5.333 2 6 3" />
    </svg>
  );
}

export function MountainIcon({ className, ...props }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("text-stone-700", className)} 
      {...props}
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
    </svg>
  );
}

export function WindIcon({ className, ...props }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("text-blue-400", className)} 
      {...props}
    >
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      <path d="M13.73 8.67c.97 1.1 1.61 2.44 1.1 3.9-.5 1.46-1.5 2-3.1 2H7.5" />
    </svg>
  );
} 