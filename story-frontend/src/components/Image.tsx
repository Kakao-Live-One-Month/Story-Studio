// src/components/ThemeInput.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Image: React.FC = () => {
  const { setTheme } = useTheme();

  // 이벤트 매개변수에 대한 타입을 React.ChangeEvent<HTMLTextAreaElement>로 지정
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div>
        <img src="/assets/logo.png" alt="logo" className="w-24 h-24"/>      
    </div>
  );
};

export default Image;
