// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { imageCreateApiRequest } from '../api/ApiRequest';
import axios from 'axios';

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
        const imageUrl: string = await imageCreateApiRequest(page_id);
        const fetchedImageUrl: string = await imageUrlConvertToBlob(imageUrl);

        setImageUrlArray(prevArray => [...prevArray, fetchedImageUrl]);
        setImageUrl(fetchedImageUrl);
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

  const imageUrlConvertToBlob = async (imageUrl: string) => {
    try {
      console.log(0);
      const response = await axios.get(imageUrl, {
        responseType: 'blob',
      });

      const blob = response.data;
      const file = new File([blob], 'image.png', { type: 'image/png'});
      console.log(1);
      const url = URL.createObjectURL(file);
      console.log(2);
      return url;
    } catch (error) {
      console.error('image fetching error: ', error);
      throw error;
    }
  };

  useEffect(() => {
    if (checkStoryCall)
    {
      callImageUrl();
    }
  }, [page_id, checkStoryCall]);

  return (
    <div>
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
