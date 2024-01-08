import React, { useState, useEffect } from 'react';
import '../styles/GenreSelect.css'; // GenreSelect 스타일시트 경로
import { useGenre } from '../contexts/GenreContext'; // 커스텀 훅 임포트

const options = ['판타지', '모험', '동물', '경쟁', '우정', '사랑', '과학', '교훈', '가족', '수업'];

const GenreSelect = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const {selectedGenre, setSelectedGenre } = useGenre(); // setSelectedGenre 함수 사용

    useEffect(() => {
        // selectedOptions 배열이 변경될 때마다 Context의 selectedGenre를 업데이트합니다.
        setSelectedGenre(selectedOptions.join(', '));
      }, [selectedOptions, setSelectedGenre]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((prevOption) => prevOption !== option);
      }
      if (prevSelectedOptions.length < 3) {
        return [...prevSelectedOptions, option];
      }
      alert('최대 3개까지만 선택 가능합니다.');
      return prevSelectedOptions;
    });
  };

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => toggleOption(option)}
          className={`option-button ${selectedOptions.includes(option) ? 'selected' : ''}`}
        >
          {option}
        </button>
      ))}
      <div>선택된 장르: {selectedGenre}</div> {/* 선택된 장르를 화면에 표시합니다. */}
    </div>
  );
};

export default GenreSelect;
