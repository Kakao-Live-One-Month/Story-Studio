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
    <div className="flex flex-col bg-slate-300 pb-10 pt-4">
      <p className="pb-4 text-center">주제</p>
      <textarea 
        className="mx-auto h-16 w-2/3" 
        placeholder="예시) 밤에만 움직이는 인형" 
        onChange={handleChange} />
    </div>
  );
};

export default ThemeInput;
