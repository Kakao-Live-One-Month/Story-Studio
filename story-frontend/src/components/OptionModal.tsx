// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface OptionMadalProps {
    QnOptions: Array<string>;
    setChoice: React.Dispatch<React.SetStateAction<number | null>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    choice: number | null;
    goToNextPage: () => void;
  }


const OptionModal: React.FC<OptionMadalProps> = ({ QnOptions, setChoice, choice, setShowModal, goToNextPage  }) => {


    const handleButtonClick = (index : number) => {
        setChoice(index);
      };

    const handleCompleteSelection = () => {
         setShowModal(false);
         goToNextPage();
    // 필요한 경우 selectedOption을 사용하여 추가 작업 수행
     };

  return (
    <div>
        <button onClick={() => setShowModal(false)}>닫기</button>
    {QnOptions.slice(1).map((QnOptions, index) => (
      <button
        key={index}
        style={{ 
          backgroundColor: choice === index + 1 ? 'blue' : 'grey',
          color: 'white'
        }}
        onClick={() => handleButtonClick(index + 1)}
      >
        {QnOptions}
      </button>
    ))}
    <button onClick={handleCompleteSelection}>선택 완료</button>
  </div>
  );
};

export default OptionModal;
