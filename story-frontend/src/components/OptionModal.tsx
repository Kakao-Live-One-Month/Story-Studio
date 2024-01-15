// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import {generateOption } from '../api/ApiRequest';
import { usePage } from '../contexts';
import { useNavigate} from 'react-router-dom';

interface OptionMadalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    page_id: number;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
  }

const OptionModal: React.FC<OptionMadalProps> = ({ setShowModal, page_id, setSelectedOption, setCheckStoryCall }) => {
  const navigate = useNavigate();
  const [qnOptions, setQnoption] = useState<string[]>([]);
  const [choice, setChoice] = useState<number>(0);
  const { selectedPage } = usePage();
  // const options = ["Question", "option1", "option2", "option3"];//qnoption의 예시

  const callOptions = async () => {
    if (page_id % 3 === 0 && page_id !== selectedPage) {
      try {
        const optionResponse = await generateOption(); 
        setQnoption(optionResponse); 
        setCheckStoryCall(false);
      } catch (error) {
        console.error('generateOption 호출 중 오류 발생:', error);
      }
    }
  };

  // useEffect(() => {
  //   callOptions();
  // }, []); 


  const handleButtonClick = (index : number) => {
    console.log(index);
    setChoice(index);
  };

  const handleCompleteSelection = () => {
    setShowModal(false);
    console.log("초이스: ", choice);
    setSelectedOption(qnOptions[choice]);

    navigate(`/generated/${page_id + 1}`);
  };

  return (
    <div>
      <button onClick={() => setShowModal(false)}>닫기</button>
      <p>{qnOptions[0]}</p>
      {qnOptions.slice(1).map((options, index) => (
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
