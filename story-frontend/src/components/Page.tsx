// src/GeneratingPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Image from '../components/Image';
import { error } from 'console';
import { usePage } from '../contexts/PageContext';

// props의 타입을 정의하는 인터페이스
interface PageProps {
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  imageUrlArray: string[];
  checkStoryCall: boolean;
}

const Page: React.FC<PageProps> = ({
  storyArray, 
  setImageUrlArray, 
  imageUrlArray,
  checkStoryCall
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoaging] = useState(false);
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");
  const param = useParams();
  const page_id = Number(param.page_id);
  // console.log(page_id);  
  const { selectedPage } = usePage();
  const [isVisitedPage, setIsVisitedPage] = useState<boolean[]>(new Array(selectedPage).fill(false));
  const lastSession = selectedPage%3;


  useEffect(() => {
    setShowLoaging(true);
      if (storyArray)
      {
        setCurrentPageStory(storyArray[page_id - 1]);
      }
  }, [page_id, storyArray]); 


  return (
    <div style={{
      display: 'flex',
      height: '800px',
      width: '100%',
    }}>
    
      <div style={{
        width: '50%',
        backgroundColor: 'grey'
      }}>
        <Image 
          imageUrlArray={imageUrlArray} 
          setImageUrlArray={setImageUrlArray}
          page_id={page_id}
          setIsVisitedPage={setIsVisitedPage}
          isVisitedPage={isVisitedPage}
          checkStoryCall={checkStoryCall}
        />
      </div>

      <div style={{
        width: '50%', 
      }}>
        <div style={{
          backgroundColor: 'white',
        }}>
          <p>{currentPageStory}</p>
        </div>
      </div>
    </div>
  );
}; 

export default Page;
