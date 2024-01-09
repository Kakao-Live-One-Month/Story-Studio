import React, { createContext, useState, useContext, ReactNode } from 'react';

// Context 생성
const GenreContext = createContext<{
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
}>({
  selectedGenre: '',
  setSelectedGenre: () => {},
});


type GenreProviderProps = {
  children: ReactNode; 
};

// Context Provider 컴포넌트
export const GenreProvider: React.FC<GenreProviderProps> = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
export const useGenre = () => useContext(GenreContext);


export default useGenre;