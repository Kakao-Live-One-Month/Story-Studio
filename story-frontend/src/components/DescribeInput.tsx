import React from 'react';
import { useDescribe } from '../contexts/DescribeContext';
import '../styles/GenreSelect.css';

const DescribeInpt: React.FC = () => {
  const { setDescribe } = useDescribe();

  // 이벤트 매개변수에 대한 타입을 React.ChangeEvent<HTMLTextAreaElement>로 지정
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescribe(event.target.value);
  };

  return (
    <div className='flex flex-col bg-slate-300 pb-10 pt-4'>
      <p className="pb-4 text-center">줄거리</p>
      <textarea 
        className="mx-auto h-32 w-2/3" 
        placeholder="원하는 내용을 입력하세요. (선택)"
        onChange={handleChange}
      />
    </div>
  );
};

export default DescribeInpt;
