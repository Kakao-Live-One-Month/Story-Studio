// src/GeneratingPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Image from '../components/Image';
import { error } from 'console';
import { useLoading, usePage } from '../contexts';
import Loading from './Loading';

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
  
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");
  const param = useParams();
  const page_id = Number(param.page_id);
  const { isLoading, setLoading } = useLoading();
                                                                                                                                                                        
  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function LoadingDelay() {
    setLoading(true); 
    await delay(1500); 
    console.log("1.5s");
    setLoading(false); 
  }


  ////////////////////////////////////////////////////////////////////

  const visitPage = (page_id: number) => {
    setIsVisitedPage(prevIsVisitedPageArray => {
      const newVisitedPageArray = [...prevIsVisitedPageArray];
      newVisitedPageArray[page_id - 1] = true;
      return newVisitedPageArray;
    });
  };

  useEffect(() => {
    if (!isVisitedPage[page_id - 1]) {
      visitPage(page_id);
    }
  }, [page_id]);

  const saveVisitToStorage = (isVisitedPage: boolean[]): void => {
    localStorage.setItem('isVisitedPage', JSON.stringify(isVisitedPage));
  };

  const loadsaveVisitFromLocalStorage = (): boolean[] | null => {
    const savedVisit = localStorage.getItem('isVisitedPage');
    return savedVisit ? JSON.parse(savedVisit) : null;
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 localStorage에서 데이터 로드
    const loadedStoryVisit = loadsaveVisitFromLocalStorage();
    console.log("loadedStoryVisit", loadedStoryVisit)
    if (loadedStoryVisit) {
      setIsVisitedPage(loadedStoryVisit);
    }
  }, []);
  useEffect(() => {
    saveVisitToStorage(isVisitedPage);
  }, [isVisitedPage]);

////////////////////////////////////////////////////////////////////


  const currentText = async () => {
    try {
      if (storyArray[page_id - 1] !== undefined) {
        const formattedStory = " " + storyArray[page_id - 1].replace(/([.?!])\s*/g, "$1\n\n\ ");
        setCurrentPageStory(formattedStory);
      }
      else {
        setCurrentPageStory("이야기 생성중...");
      }
    }
    catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  useEffect(() => {
    currentText();
  }, [page_id, storyArray]);


  // useEffect(() => {
  //   if(storyArray[page_id - 1]==undefined || storyArray[page_id - 1]=="undefined"){
  //    LoadingDelay();
  //   }
  // }, [storyArray]);




  return (
    <div id="story-page" className="flex h-full w-[1200px] p-4 ">
      {/* {isLoading && (<Loading/>)} */}
      <div className="w-1/2 pr-4 flex justify-center items-center">
        <Image 
          imageUrlArray={imageUrlArray} 
          setImageUrlArray={setImageUrlArray}
          page_id={page_id}
          setIsVisitedPage={setIsVisitedPage}
          isVisitedPage={isVisitedPage}
          checkStoryCall={checkStoryCall}
          storyArray={storyArray}
        />
      </div>

      <div className="w-1/2 p-12 flex items-center">
        <p 
          className='text-3xl pt-12 pl-16'
          style={{ whiteSpace: 'pre-wrap' }}
        >{currentPageStory}</p>
      </div>
    </div>
  );
}; 

export default Page;