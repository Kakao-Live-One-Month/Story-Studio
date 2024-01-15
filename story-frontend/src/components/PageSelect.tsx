import React, { useState, useEffect } from 'react';
import { usePage } from '../contexts/PageContext'; // 커스텀 훅 임포트

const PageSelect = () => {
  const {selectedPage, setSelectedPage } = usePage(); // setSelectedPage 함수 사용
  
  useEffect(() => {
    setSelectedPage(9);
  }, [setSelectedPage]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageNumber = Number(event.target.value);
    setSelectedPage(newPageNumber);

  };

  return (
    <div className="flex flex-col bg-orange-400 py-10 pt-4 px-10">
      <p className="pb-4 text-center">페이지 수</p>
      <input 
        type="range" 
        min="4" 
        max="15"
        value={selectedPage}
        onChange={handleSliderChange}
        className="slider" />

      <div>선택된 페이지 수: {selectedPage}</div>
    </div>
  );
};

export default PageSelect;
