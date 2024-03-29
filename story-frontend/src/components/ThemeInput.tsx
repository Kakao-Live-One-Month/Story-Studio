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
    <div className="flex flex-col pb-5 pt-4">
      <p className="pb-4 text-center font-gowun-batang text-xl lg:text-3xl lg:pt-8">주제</p>
      <textarea 
        className="mx-auto p-2 h-9 w-4/5 text-sm font-gowun-batang lg:text-lg lg:h-11 shadow-inner-darksm" 
        placeholder=" 예시) 밤에만 움직이는 인형" 
        onChange={handleChange} />
    </div>
  );
};

export default ThemeInput;
