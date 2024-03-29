import React from 'react';
import { useDescribe } from '../contexts/DescribeContext';


const DescribeInpt: React.FC = () => {
  const { setDescribe } = useDescribe();

  // 이벤트 매개변수에 대한 타입을 React.ChangeEvent<HTMLTextAreaElement>로 지정
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescribe(event.target.value);
  };

  return (
    <div className='flex flex-col pb-10 pt-1'>
      <p className="pb-4 text-center font-gowun-batang text-xl lg:text-3xl lg:pt-8">줄거리</p>
      <textarea 
        className="mx-auto h-28 p-2 w-4/5 text-sm font-gowun-batang lg:text-lg shadow-inner-darksm" 
        placeholder=" 예시) 인형이 친구들과 함께 여행했으면 좋겠어!"
        onChange={handleChange}
      />
    </div>
  );
};

export default DescribeInpt;
