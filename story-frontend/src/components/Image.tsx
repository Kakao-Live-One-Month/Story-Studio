// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { imageCreateApiRequest } from '../api/ApiRequest';
import { usePage } from '../contexts';
import { ImageStorage } from '../storage';
import { Loading } from '../components';

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
  const [check, setCheck] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // let id: number = 0;

  const callImageUrl = async (i: number) => {
    try {
      if(!isVisitedPage[page_id - 1]){
        const newImageUrl = "http://localhost:8080/images/image-" + (1+i) + ".png";
        // const newImageUrl = await imageCreateApiRequest(page_id+i);
        setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        console.log("imageUrlCall:", i+newImageUrl);

          // id++;
          const id = page_id+i;
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
      console.log("currentImage", page_id);
      
      const timestamp = Date.now();
      const serverImageUrl = `http://localhost:8080/images/image-${page_id}.png?timestamp=${timestamp}`;
      console.log("currentImage 호출", serverImageUrl);
      setImageUrl(serverImageUrl);

      await delay(3000);
    }
    catch (error) {
      console.error('이미지 생성 에러:', error);
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
      />
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
