import React from 'react';
import { useDescribe } from '../contexts/DescribeContext';

const ThemeInput: React.FC = () => {
  const { setDescribe } = useDescribe();

  // 이벤트 매개변수에 대한 타입을 React.ChangeEvent<HTMLTextAreaElement>로 지정
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescribe(event.target.value);
  };

  return (
    <div>
      <div className='pb-9 text-4xl text-center'>줄거리</div>
      <textarea 
        className="resize-none w-[750px] h-[335px] rounded-md shadow-inner-dark p-4"
        placeholder="원하는 내용을 입력하세요. (선택)"/>
    </div>
  );
};

export default ThemeInput;
