// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { imageCreateApiRequest } from '../api/ApiRequest';

interface ImageProps {
  imageUrlArray: string[];
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  page_id: number; 
  isVisitedPage: boolean[];
  setIsVisitedPage: React.Dispatch<React.SetStateAction<boolean[]>>;
  checkStoryCall: boolean;
}

const Image: React.FC<ImageProps> = ({imageUrlArray, setImageUrlArray, page_id, isVisitedPage, setIsVisitedPage, checkStoryCall}) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const visitPage = (page_id: number) => {
    setIsVisitedPage(prevIsVisitedPageArray => {
      const newVisitedPageArray = [...prevIsVisitedPageArray];
      newVisitedPageArray[page_id - 1] = true;
      
      return newVisitedPageArray;
    });
  };

  const callImageUrl = async () => {
    try {
      if (!isVisitedPage[page_id - 1]) 
      {
        const newImageUrl = await imageCreateApiRequest(page_id);

        setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        setImageUrl(newImageUrl);
        visitPage(page_id);
        
      } 
      else 
      {
        const prevImageUrl = imageUrlArray[page_id - 1];
        setImageUrl(prevImageUrl);
      }
    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  // useEffect(() => {
  //   if (checkStoryCall)
  //   {
  //     callImageUrl();
  //   }
  // }, [page_id, checkStoryCall]);

  return (
    <div>
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
