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
    <div>
      <div className='pb-9 text-4xl text-center'>페이지 수</div>
      <input
        type="range"
        min="4"
        max="15"
        value={selectedPage}
        onChange={handleSliderChange}
        className="slider w-[750px] h-2" // 반응형 너비 설정
      />

      <div className="relative">
        {marks.map(mark => {
          // 슬라이더 전체 너비에 대한 눈금의 위치를 계산합니다.
          const leftStyle = {
            left: `calc(${((mark - 4) / totalMarks) * 100}% - ${(String(mark).length * 8) / 2}px)` // 숫자의 길이에 따라 조정
          };
          return (
            <span key={mark} className="absolute text-base" style={leftStyle}>
              {mark}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PageSelect;
