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
    <div className="p-5">
        <div className='pb-9 text-4xl text-center'>장르</div>

        <div className="grid grid-cols-5 gap-4">
          {options.map((option, index) => {
            const isSelected = selectedOptions.includes(option);
            const baseClass = 'option-button rounded-full text-xl focus:outline-none w-32 h-15';
            const colorClass = isSelected ? 
                               (index % 5 === 0 ? 'bg-indigo-400 shadow-inner-dark' :
                                index % 5 === 1 ? 'bg-violet-400 shadow-inner-dark' :
                                index % 5 === 2 ? 'bg-purple-400 shadow-inner-dark' :
                                index % 5 === 3 ? 'bg-fuchsia-300 shadow-inner-dark' :
                                                  'bg-pink-300 shadow-inner-dark') :
                               (index % 5 === 0 ? 'bg-indigo-300 shadow-lg hover:bg-indigo-400' :
                                index % 5 === 1 ? 'bg-violet-300 shadow-lg hover:bg-violet-400' :
                                index % 5 === 2 ? 'bg-purple-300 shadow-lg hover:bg-purple-400' :
                                index % 5 === 3 ? 'bg-fuchsia-200 shadow-lg hover:bg-fuchsia-300' :
                                                  'bg-pink-200 shadow-lg hover:bg-pink-300');
          

            return (
              <button
                  key={index}
                  onClick={() => toggleOption(option)}
                  className={`${baseClass} ${colorClass}`}
              >
                  {option}
              </button>
          );
          })}
        </div>
        <div className='text-center mt-4'>선택된 장르: {selectedGenre}</div> {/* 선택된 장르를 화면에 표시합니다. */}
    </div>
  );
};

export default GenreSelect;
