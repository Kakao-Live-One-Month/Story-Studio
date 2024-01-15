// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DescribeContextType {
  describe: string;
  setDescribe: (describe: string) => void;
}

const DescribeContext = createContext<DescribeContextType | undefined>(undefined);

export const DescribeProvider = ({ children }: { children: ReactNode }) => {
  const [describe, setDescribe] = useState<string>('');

  return (
    <DescribeContext.Provider value={{ describe, setDescribe }}>
      {children}
    </DescribeContext.Provider>
  );
};

export const useDescribe = () => {
  const context = useContext(DescribeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default useDescribe;