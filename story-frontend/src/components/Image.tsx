// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { imageCreateApiRequest } from '../api/ApiRequest';
import { usePage } from '../contexts';
import { ImageStorage } from '../storage';

interface ImageProps {
  imageUrlArray: string[];
  page_id: number; 
  isVisitedPage: boolean[];
  checkStoryCall: boolean;
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  setCheckStoryCall: React.Dispatch<React.SetStateAction<boolean>>;
}

const Image: React.FC<ImageProps> = ({imageUrlArray, setImageUrlArray, page_id, isVisitedPage, checkStoryCall, setCheckStoryCall}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const { selectedPage } = usePage();

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let id: number = 0;

  const callImageUrl = async (i: number) => {
    try {
      if(!isVisitedPage[page_id - 1]){
     
        const newImageUrl = `image${i+1}` as string;
        setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        // const newImageUrl = await imageCreateApiRequest(page_id+i);
        // setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        console.log("imageUrlCall:", i+newImageUrl);

          id++;
          // console.log("id: ", id);
          // const url = newImageUrl;
          // fetch('http://localhost:8080/api/convert', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     id,
          //     url,
          //   })
          // });
        }

    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  useEffect(() => {
    if(checkStoryCall){
      if(page_id % 3 == 1){
        if (selectedPage-page_id > 1){
          for(let i=0; i<3; i++){
            (async () => {
              await callImageUrl(i);
            })();
          }
        }else{
          for(let i=0; i<selectedPage-page_id+1 ; i++){
            (async () => {
              await callImageUrl(i);
            })();
          }
        }
      }
    }
  }, [page_id, checkStoryCall]);





  const currentImage = async () => {
    try {
      console.log("currentImage", page_id);

      const serverImageUrl = `http://localhost:8080/images/image-${page_id}.png`;
      console.log("currentImage 호출", serverImageUrl);
      setImageUrl(serverImageUrl);
      // setImageUrl("/img/Img_Loading.png");
      await delay(3000);
    }
     catch (error) {
      console.error('이미지 생성 에러:', error);
      setImageUrl("/img/Img_Loading.png");
    }
  };

  useEffect(() => {
    if(imageUrlArray[page_id - 1] !== undefined ){
      currentImage();
    }
    // currentImage();
  },[page_id, imageUrlArray]);




  return (
    <div>
      <ImageStorage
        imageUrlArray={imageUrlArray}
        setImageUrlArray={setImageUrlArray}
        checkStoryCall={checkStoryCall}
        page_id={page_id}
      />
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
