import React, { useState, useEffect } from 'react';
import { useGenre } from '../contexts/GenreContext'; 

const options = ['판타지', '모험', '동물', '경쟁', '우정', '사랑', '과학', '교훈', '가족', '수업'];

const GenreSelect = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const {selectedGenre, setSelectedGenre } = useGenre(); 

    useEffect(() => {
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
    <div className="bg-red-200 pb-8 pt-4">
      <p className="pb-4 text-center">장르</p>
      <div className="grid grid-cols-2 gap-4 bg-red-100 px-6 md:grid-cols-5">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => toggleOption(option)}
            className={`h-12 w-full bg-green-500 rounded-full ${selectedOptions.includes(option) ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
        
        <div>선택된 장르: {selectedGenre}</div>
      </div>
    </div>
  );
};

export default GenreSelect;
