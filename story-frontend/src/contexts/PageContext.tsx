import React, { createContext, useState, useContext, ReactNode } from 'react';

// Context 생성
const PageContext = createContext<{
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
}>({
  selectedPage: '',
  setSelectedPage: () => {},
});

// GenreProvider에 대한 타입을 정의합니다.
type PageProviderProps = {
  children: ReactNode; // ReactNode 타입을 사용하여 children을 정의합니다.
};

// Context Provider 컴포넌트
export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState('');

  return (
    <PageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </PageContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
export const usePage = () => useContext(PageContext);
