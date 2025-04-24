'use client';
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes"
 
import { ProgressProvider } from '@bprogress/next/app';
 
const ProgressProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const { resolvedTheme } = useTheme();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

  return (
    <ProgressProvider 
      height="4px"
      color={resolvedTheme === 'dark' ? "#89bc57" : "#04032b"}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
 
export default ProgressProviderWrapper;