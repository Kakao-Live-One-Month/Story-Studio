// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import {generateOption } from '../api/ApiRequest';
import { useTheme, usePage } from '../contexts';
import { useNavigate} from 'react-router-dom';

interface OptionMadalProps {
    setChoice: React.Dispatch<React.SetStateAction<number | null>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    choice: number | null;
    page_id: number;
  }


const OptionModal: React.FC<OptionMadalProps> = ({ setChoice, choice, setShowModal, page_id  }) => {
  const navigate = useNavigate();
  const [qnOptions, setQnoption] = useState<string[]>();
  const { selectedPage } = usePage();
  const options = ["Question", "option1", "option2", "option3"];//qnoption의 예시


  useEffect(() => {
    if (page_id % 3 === 0 && page_id!==selectedPage) {
      const response: Promise<string[]> = generateOption();

      // setQnoption(response);
      setQnoption(options);//options=response
    }
  }, [choice]); 




    const handleButtonClick = (index : number) => {
        setChoice(index);
      };

    const handleCompleteSelection = () => {
         setShowModal(false);
         navigate(`/generated/${page_id + 1}`);
    // 필요한 경우 selectedOption을 사용하여 추가 작업 수행
     };

  return (
    <div>
        <button onClick={() => setShowModal(false)}>닫기</button>
    {options.slice(1).map((options, index) => (
      <button
        key={index}
        style={{ 
          backgroundColor: choice === index + 1 ? 'blue' : 'grey',
          color: 'white'
        }}
        onClick={() => handleButtonClick(index + 1)}
      >
        {options}
      </button>
    ))}
    <button onClick={handleCompleteSelection}>선택 완료</button>
  </div>
  );
};

export default OptionModal;
