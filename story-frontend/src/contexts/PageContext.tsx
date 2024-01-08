// src/contexts/PageContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface PageContextType {
  selectedPage: number;
  setSelectedPage: (page: number) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  // 초기값을 sessionStorage에서 읽어옴. 데이터가 없는 경우 기본값 0을 사용
  const [selectedPage, setSelectedPage] = useState<number>(
    () => JSON.parse(sessionStorage.getItem('selectedPage') || '0')
  );

  // selectedPage 상태가 변경될 때마다 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem('selectedPage', JSON.stringify(selectedPage));
  }, [selectedPage]);

  return (
    <PageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </PageContext.Provider>
  );
};

// usePage 훅
export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};
