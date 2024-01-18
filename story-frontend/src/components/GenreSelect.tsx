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
    <div className="pb-8 pt-4">
      <p className="pb-4 text-center font-gowun-batang text-xl lg:text-4xl lg:pt-8">장르</p>

      <div className="grid grid-cols-2 gap-4 px-6 md:grid-cols-5 font-gowun-batang pb-4 lg:text-xl">
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(option);
          const colorClass = isSelected ? 
                            (index % 5 === 0 ? 'bg-indigo-400' :
                              index % 5 === 1 ? 'bg-violet-400' :
                              index % 5 === 2 ? 'bg-purple-400' :
                              index % 5 === 3 ? 'bg-fuchsia-300' :
                                                'bg-pink-300') :
                            (index % 5 === 0 ? 'bg-indigo-300' :
                              index % 5 === 1 ? 'bg-violet-300' :
                              index % 5 === 2 ? 'bg-purple-300' :
                              index % 5 === 3 ? 'bg-fuchsia-200' :
                                                'bg-pink-200');
          const shadowClass = isSelected ? 'shadow-inner-dark' : 'hover:shadow-lg-dark';
          return (
            <button
              key={index}
              onClick={() => toggleOption(option)}
              className={`h-9 w-full rounded-full ${colorClass} ${shadowClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenreSelect;
