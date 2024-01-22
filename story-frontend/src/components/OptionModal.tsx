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
    navigate(`/generated/${page_id + 1}`);
    setCheckStoryCall(false);
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

  const buttonColors = ['#EE8D1B', '#E5A500', '#ECC45F'];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap mx-auto justify-center fixed w-full h-full z-20">
      <div className="flex flex-wrap mx-auto justify-center fixed left-1/2 top-1/2 w-[1440px] h-[700px] -translate-x-1/2 -translate-y-1/2 transform rounded bg-white bg-opacity-50">
        {/* 모달 내용이 담길 컨테이너 */}
        </div>
        <div className="flex flex-col h-1/2 w-3/4 z-30 mx-auto xl:w-[960px]">

            <p className="text-center text-3xl md:text-4xl pt-24 pb-8">{qnOptions[0]}</p>

            {/* 선택지 버튼 */}
            <div className="grid items-end w-full space-y-5 p-5">    
              {qnOptions.slice(1).map((options, index) => (
                
                <button
                  key={index}
                  className={`text-black text-2xl md:text-3xl text-center rounded-lg w-full h-[96px] cursor-pointer transition-all duration-300`}
                  onClick={() => handleButtonClick(index + 1)}
                  onMouseOver={() => setHoveredIndex(index)}
                  onMouseOut={() => setHoveredIndex(null)}
                  style={{
                    backgroundColor: buttonColors[index],
                    boxShadow: (choice === index + 1 || hoveredIndex === index) ? 'none' : '4px 4px 0 0 rgba(0, 0, 0, 0.3)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                  }}
                >
                  {options}
                </button>
              ))}
            </div>
              {/* 다시보기 및 선택 완료 버튼 */}
            <div className="flex pt-4 px-8 justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="text-black text-xl md:text-2xl underline">내용 다시 보기</button>

                
              <button
                onClick={handleCompleteSelection}
                className="text-black text-xl md:text-2xl  underline">선택 완료</button>
          </div>
        </div>
      </div>

  );
};

export default OptionModal;
