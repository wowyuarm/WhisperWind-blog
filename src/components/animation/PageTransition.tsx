"use client"

import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div 
      className="w-full opacity-0 animate-fade-in-up"
    >
      {children}
    </div>
  );
} 