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

  const marks = Array.from({ length: 12 }, (_, i) => i + 4);
  const totalMarks = marks.length - 1; // 총 눈금의 개수 (0부터 시작)

  return (
    <div className="flex flex-col py-10 pt-4 px-10">
      <p className="pb-4 text-center font-gowun-batang text-xl lg:text-4xl lg:pt-8">페이지 수</p>
      <input 
        type="range" 
        min="4" 
        max="15"
        value={selectedPage}
        onChange={handleSliderChange}
        className="slider" />

      <div className="relative pb-6">
        {marks.map(mark => {
          const leftStyle = {
            left: `calc(${((mark - 4) / totalMarks) * 100}% - ${(String(mark).length * 8) / 2}px)` // 숫자의 길이에 따라 조정
          };
          return (
            <span key={mark} className="absolute text-sm font-gowun-batang" style={leftStyle}>
              {mark}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PageSelect;
