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
    qnOptions: string[];
  }

const OptionModal: React.FC<OptionMadalProps> = ({ setShowModal, page_id, setSelectedOption, setCheckStoryCall, qnOptions}) => {
  const navigate = useNavigate();

  const [choice, setChoice] = useState<number>(0);
  const { selectedPage } = usePage();
  // const options = ["Question", "option1", "option2", "option3"];//qnoption의 예시

  const handleButtonClick = (index : number) => {
    console.log(index);
    setChoice(index);
  };

  const handleCompleteSelection = () => {
    setShowModal(false);
    console.log("초이스: ", choice);
    setSelectedOption(qnOptions[choice]);
    setCheckStoryCall(false);
    navigate(`/generated/${page_id + 1}`);
  };

  const buttonImages = [
    '../../img/option1.png',
    '../../img/option2.png',
    '../../img/option3.png',
  ];

  const buttonImagesSelected = [
    '../../img/selectoption1.png',
    '../../img/selectoption2.png',
    '../../img/selectoption3.png',
  ];

  return (
    <div className="flex justify-center fixed left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform rounded bg-white bg-opacity-80 p-8 z-20">
      {/* 모달 내용이 담길 컨테이너 */}
      <div className="flex flex-col justify-center xl:w-[1000px] mx-auto w-3/4">
        <div>
          <button onClick={() => setShowModal(false)} className="top-0 left-0 text-black text-xl md:text-2xl underline">내용 다시 보기</button>
        </div>

        <div className="flex flex-col justify-center items-center py-20">
          {/* 질문 */}
          <p className="py-12 text-center text-3xl md:text-4xl">{qnOptions[0]}</p>
          
          {/* 선택지 버튼 */}
          <div className="grid items-end w-full space-y-5 p-5">    
            {qnOptions.slice(1).map((options, index) => (
              
              <button
                key={index}
                className={`text-black text-xl md:text-2xl text-center w-full h-[96px] cursor-pointer`}
                onClick={() => handleButtonClick(index + 1)}
                style={{
                  backgroundImage: `url(${choice === index + 1 ? buttonImagesSelected[index] : buttonImages[index]})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                }}
              >
                {options}
              </button>

            ))}
          </div>

          <div className="w-full px-5 py-8">
            {/* 선택 완료 버튼 */}
            <button
              onClick={handleCompleteSelection}
              className="bg-black text-white text-xl md:text-2xl py-7 w-full rounded-[70px] cursor-pointer"
            >
              선택 완료
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OptionModal;
