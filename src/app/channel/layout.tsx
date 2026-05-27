'use client';
import { useEffect } from 'react';

// Watch pages bypass the normal sidebar/padding layout.
// We use a negative margin trick to escape the parent padding.
export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 -my-6 lg:-ml-10">
      {children}
    </div>
  );
}
