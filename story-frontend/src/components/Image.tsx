// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { imageCreateApiRequest } from '../api/ApiRequest';
import { usePage } from '../contexts';
import { ImageStorage } from '../storage';
import { Loading } from '../components';
import { saveImageToDB, getImageFromDB } from '../utils/imageDB';

interface ImageProps {
  imageUrlArray: string[];
  page_id: number; 
  isVisitedPage: boolean[];
  checkStoryCall: boolean;
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
  storyArray?: string[]; // 추가
  title?: string; // 추가
  summary?: string; // 추가
}

const Image: React.FC<ImageProps> = ({
  imageUrlArray,
  setImageUrlArray, 
  page_id, 
  isVisitedPage, 
  checkStoryCall, 
  setCheckStoryCall,
  storyArray = [], // 추가
  title = '', // 추가
  summary = '', // 추가
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const { selectedPage } = usePage();
  const [check, setCheck] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // let id: number = 0;

  const callImageUrl = async (i: number) => {
    if (!isVisitedPage[page_id - 1]) {
      const newImageUrl = await imageCreateApiRequest(page_id + i);
      
      if (newImageUrl) {
        const index = page_id + i - 1;
        const key = `page-${index + 1}`;
        
        // 1. IndexedDB에 이미지 저장
        await saveImageToDB(key, newImageUrl);
        
        // 2. Firebase에 URL 저장 (기존 로직 유지)
        setImageUrlArray((prev) => {
          const newArray = [...prev];
          newArray[index] = newImageUrl;
          return newArray;
        });
      }
    }
  };
  
  const currentImage = async () => {
    const key = `page-${page_id}`;
    
    // 1. IndexedDB 먼저 확인
    const cachedUrl = await getImageFromDB(key);
    if (cachedUrl) {
      setImageUrl(cachedUrl);
      return;
    }
    
    // 2. imageUrlArray(Firebase)에서 가져오고 IndexedDB 캐싱
    if (imageUrlArray[page_id - 1]) {
      const url = imageUrlArray[page_id - 1];
      setImageUrl(url);
      await saveImageToDB(key, url); // 캐싱
    } else {
      setImageUrl("/img/Img_Loading.png");
    }
  };

  const currentImageFunction = async () => {
    if (imageUrlArray[page_id - 1] !== undefined) {
  
      if (page_id % 3 === 1 && !isVisitedPage[page_id-1] && check) {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 23000));
        await currentImage();
        setLoading(false);
      } 
      else {
        await currentImage();
      }

    }
  }

  useEffect(() => {
    if(checkStoryCall){
      if(page_id % 3 == 1){
        if (selectedPage-page_id > 1){
          for(let i=0; i<3; i++){
            (async () => {
              await callImageUrl(i);
              setCheck(true);
              console.log("생성 체크 : ", check);
            })();
          }
        }else{
          for(let i=0; i<selectedPage-page_id+1 ; i++){
            (async () => {
              await callImageUrl(i);
              setCheck(true);
              console.log("생성 체크 : ", check);
            })();
          }
        }
      }
    }
  }, [isVisitedPage]);


  useEffect(() => {
    console.log("check is : ", check);
    currentImageFunction();
  },[page_id, imageUrlArray]);



  return (
    <div>
      {isLoading && (
          <Loading/>
        )}
      <ImageStorage
        imageUrlArray={imageUrlArray}
        setImageUrlArray={setImageUrlArray}
        checkStoryCall={checkStoryCall}
        page_id={page_id}
        storyArray={storyArray} // 추가
        title={title} // 추가
        summary={summary} // 추가
      />
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
