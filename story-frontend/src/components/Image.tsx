// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import {usePage } from '../contexts';
import { ImageStorage } from '../storage';
import { imageCreateApiRequest } from '../api/ApiRequest';

interface ImageProps {
  imageUrlArray: string[];
  page_id: number; 
  isVisitedPage: boolean[];
  checkStoryCall: boolean;
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
}

const Image: React.FC<ImageProps> = ({imageUrlArray, setImageUrlArray, page_id, isVisitedPage, checkStoryCall, storyArray}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const { selectedPage } = usePage();

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


//이야기 생성 후 이미지 3개 직렬 요청
  const callImageUrl = async (i: number) => {
    try {
      if(!isVisitedPage[page_id - 1]){
        await delay(10000);  // 3초 지연
        const newImageUrl = `image${i+1}` as string;
        setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        // const newImageUrl = await imageCreateApiRequest(page_id+i);
        // setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        console.log("imageUrlCall:", i+newImageUrl);
        }
    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  useEffect(() => {
    if(checkStoryCall){
     if (imageUrlArray[page_id - 1] == undefined) {
      if(page_id % 3 == 1){
        if (selectedPage-page_id > 1){
          for(let i=0; i<3; i++){
          callImageUrl(i);
          console.log("callImageUrl3:", page_id+i);
          }
        }else{
          for(let i=0; i<selectedPage-page_id+1 ; i++){
          callImageUrl(i);
          console.log("callImageUrl%3", page_id+i);
          }
        }
      }
     }
    }
  }, [page_id, checkStoryCall]);



//현재페이지 이미지 셋
  const currentImage = async () => {
    try {
      if (imageUrlArray[page_id - 1] !== '') {
      setImageUrl(imageUrlArray[page_id - 1]);
      console.log("currentImage");
      }  
      else {
        setImageUrl("이미지 생성중...");
      }
    }
     catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  useEffect(() => {
    if(imageUrlArray[page_id - 1] !== undefined ){
      currentImage();
    }
  },[page_id, imageUrlArray, imageUrl]);


  return (
    <div>
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
