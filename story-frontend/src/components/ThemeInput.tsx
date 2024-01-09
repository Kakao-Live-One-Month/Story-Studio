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
      <div className='pb-9 text-4xl text-center'>주제</div>
      <textarea 
        className="resize-none w-[750px] h-[70px] rounded-md shadow-inner-dark p-4"
        placeholder="예시)밤에만 움직이는 인형"
        onChange={handleChange}
      />  
    </div>
  );
};

export default ThemeInput;
