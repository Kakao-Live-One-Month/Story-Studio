// src/components/ThemeInput.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeInput: React.FC = () => {
  const { setTheme } = useTheme();

  // 이벤트 매개변수에 대한 타입을 React.ChangeEvent<HTMLTextAreaElement>로 지정
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <textarea 
        className="theme-input" 
        placeholder="예시)밤에만 움직이는 인형"
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default ThemeInput;
