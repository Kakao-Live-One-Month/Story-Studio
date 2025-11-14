// src/GeneratingPage.tsx
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Image from '../components/Image';
import ErrorPage  from '../pages/ErrorPage';
// props의 타입을 정의하는 인터페이스
interface PageProps {
  storyArray: string[];
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  imageUrlArray: string[];
  isVisitedPage: boolean[];
  checkStoryCall: boolean;
  setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string; // 추가
  summary?: string; // 추가
}

const Page: React.FC<PageProps> = ({
  storyArray, 
  setImageUrlArray, 
  imageUrlArray,
  isVisitedPage,
  checkStoryCall,
  setCheckStoryCall,
  title = '', // 추가
  summary = '', // 추가
}) => {
  
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");
  const param = useParams();
  const page_id = Number(param.page_id);


  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  const currentText = async () => {
    try {
      if (storyArray[page_id - 1] !== undefined) {
        const formattedStory = " " + storyArray[page_id - 1].replace(/([.!?])(?![‘’'"])\s*/g, "$1\n\n\ ");
        setCurrentPageStory(formattedStory);
      }
      else {
        setCurrentPageStory("이야기 생성중...");
      }
    }
    catch (error) {
      console.error('이야기 생성 에러:', error);
    }
  };

  useEffect(() => {
    currentText();
  }, [page_id, storyArray]);

  
  return (
    <div id="story-page" className="flex h-full w-[1200px] p-4 ">
      
      <div className="w-1/2 pr-4 flex justify-center items-center">
        <Image 
          imageUrlArray={imageUrlArray} 
          setImageUrlArray={setImageUrlArray}
          page_id={page_id}
          isVisitedPage={isVisitedPage}
          checkStoryCall={checkStoryCall}
          setCheckStoryCall={setCheckStoryCall}
          storyArray={storyArray} // 추가
          title={title} // 추가
          summary={summary} // 추가
        />
      </div>

      <div className="w-1/2 p-12 flex items-center">
        <p className='text-3xl pt-12 pl-16' style={{ whiteSpace: 'pre-wrap' }}>
          {currentPageStory}
        </p>
      </div>
    </div>
  );
}; 

export default Page;