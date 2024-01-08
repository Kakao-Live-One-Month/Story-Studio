// src/components/SomeOtherComponent.tsx
import React from 'react';
import { useGenre } from '../contexts/GenreContext';
import { usePage } from '../contexts/PageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useDescribe } from '../contexts/DescribeContext';


const ApiRequest = () => {
  const { selectedGenre } = useGenre();
  const { selectedPage } = usePage();
  const { theme } = useTheme();
  const { describe } = useDescribe();
  
  return (
    <div>
  <div>선택된 장르: {selectedGenre}</div>
  <div>선택된 페이지수: {selectedPage}</div>
  <div>입력된 주제: {theme}</div>
  <div>입력된 설명: {describe}</div>
    </div>
  );
};

export default ApiRequest;
