// src/components/SomeOtherComponent.tsx
import React from 'react';
import { useGenre } from '../contexts/GenreContext';
import { usePage } from '../contexts/PageContext';


const Prompt = () => {
  const { selectedGenre } = useGenre();
  const { selectedPage } = usePage();

  return (
    <div>
  <div>선택된 장르: {selectedGenre}</div>
  <div>선택된 페이지수: {selectedPage}</div>
    </div>
  );
};

export default Prompt;
