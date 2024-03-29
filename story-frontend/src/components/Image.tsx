// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { imageCreateApiRequest } from '../api/ApiRequest';
import { useLoading, usePage } from '../contexts';
import Loading from './Loading';

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

  let id: number = 0;

  const callImageUrl = async (i: number) => {
    try {
      if(!isVisitedPage[page_id - 1]){
        await delay(10000);  // 3초 지연

        const newImageUrl = await imageCreateApiRequest(page_id+i);
        setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        console.log("imageUrlCall:", i+newImageUrl);

        id++;
        console.log("id: ", id);
        const url = newImageUrl;
        fetch('http://localhost:8080/api/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            url,
          })
        });
        }

    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  const currentImage = async () => {
    try {
      console.log("currentImage");

      const serverImageUrl = `http://localhost:8080/images/image-${page_id}.png`;
      console.log("currentImage 호출", serverImageUrl);
      setImageUrl(serverImageUrl);

      await delay(3000);
    }
     catch (error) {
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


  useEffect(() => {
    currentImage();
  },[page_id]);


  return (
    <div>
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
