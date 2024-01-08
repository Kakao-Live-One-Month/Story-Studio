import React, { useState } from 'react';
import '../styles/PageSelect.css'; 
import { usePage } from '../contexts/PageContext'; // 커스텀 훅 임포트

const PageSelect = () => {
  const [pageNumber, setPageNumber] = useState(4); // 초기 값으로 4를 설정
  const { setSelectedPage } = usePage(); // setSelectedPage 함수 사용
  
  setSelectedPage(pageNumber.toString());

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageNumber = Number(event.target.value);
    setPageNumber(newPageNumber);
    setSelectedPage(newPageNumber.toString()); // pageNumber를 문자열로 변환하여 저장합니다.
  };

  return (
    <div className="page-select-container">
      <input
        type="range"
        min="4"
        max="15"
        value={pageNumber}
        onChange={handleSliderChange}
        className="slider"
      />
      <div>선택된 페이지 수: {pageNumber}</div>
    </div>
  );
};

export default PageSelect;
