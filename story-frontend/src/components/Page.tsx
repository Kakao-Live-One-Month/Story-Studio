// src/GeneratingPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Image from '../components/Image';
import { error } from 'console';

// props의 타입을 정의하는 인터페이스
interface PageProps {
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  imageUrlArray: string[];
  setIsVisitedPage: React.Dispatch<React.SetStateAction<boolean[]>>;
  isVisitedPage: boolean[];
  checkStoryCall: boolean;
}

const Page: React.FC<PageProps> = ({
  storyArray, 
  setImageUrlArray, 
  imageUrlArray,
  setIsVisitedPage,
  isVisitedPage,
  checkStoryCall
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoaging] = useState(false);
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");
  const param = useParams();
  const page_id = Number(param.page_id);
  // console.log(page_id);  



  const currentText = async () => {
    try {
      if (storyArray[page_id - 1] !== undefined) {
        // 문장부호 뒤에 두 개의 줄바꿈 문자 추가 및 첫 줄에 스페이스 추가
        const formattedStory = " " + storyArray[page_id - 1].replace(/([.?!])\s*/g, "$1\n\n\ ");
        setCurrentPageStory(formattedStory);
      }
      else {
        setCurrentPageStory("undefined");
      }
    }
    catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  useEffect(() => {
    currentText();
  }, [page_id, storyArray]);



  return (
    <div id="story-page" className="flex h-full w-[1200px] p-4 bg-yellow-200">
      <div className="w-1/2 bg-red-200 p-12 flex justify-center items-center">
        <Image 
          imageUrlArray={imageUrlArray} 
          setImageUrlArray={setImageUrlArray}
          page_id={page_id}
          setIsVisitedPage={setIsVisitedPage}
          isVisitedPage={isVisitedPage}
          checkStoryCall={checkStoryCall}
        />
      </div>

      <div className="w-1/2 bg-red-100 p-12 flex items-center">
        <p 
          className='text-3xl bg-blue-200'
          style={{ whiteSpace: 'pre-wrap' }}
        >{currentPageStory}</p>
      </div>
    </div>
  );
}; 

export default Page;