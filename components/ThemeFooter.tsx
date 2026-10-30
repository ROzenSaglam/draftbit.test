import React from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ThemeFooterProps extends ViewProps {
  children: React.ReactNode;
}

export default function ThemedFooter({ children, className, ...props }: ThemeFooterProps) {
  return (
    <SafeAreaView
      edges={['bottom']}
      className={`bg-background  px-global pt-global w-full  ${className || ''}`}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
