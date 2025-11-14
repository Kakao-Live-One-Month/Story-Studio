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
    try {
      if (!isVisitedPage[page_id - 1]) {
        // OpenAI API로 이미지 URL 생성
        const newImageUrl = await imageCreateApiRequest(page_id + i);
        
        if (newImageUrl) {
          // imageUrlArray에 URL 추가 (Firestore에 자동 저장됨)
          setImageUrlArray((prevArray) => {
            const newArray = [...prevArray];
            // 배열 인덱스는 0부터 시작하므로 page_id + i - 1
            const index = page_id + i - 1;
            newArray[index] = newImageUrl;
            return newArray;
          });
          console.log("imageUrlCall:", i, newImageUrl);
        } else {
          console.error('이미지 URL 생성 실패');
        }
      }
    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  const currentImage = async () => {
    try {
      console.log("currentImage", page_id);
      
      // imageUrlArray에서 해당 페이지 이미지 URL 가져오기
      if (imageUrlArray[page_id - 1]) {
        const imageUrlFromArray = imageUrlArray[page_id - 1];
        console.log("currentImage 호출 - imageUrlArray에서:", imageUrlFromArray);
        setImageUrl(imageUrlFromArray);
      } else {
        // 이미지가 없으면 로딩 이미지 표시
        console.log("이미지가 없어 로딩 이미지 표시");
        setImageUrl("/img/Img_Loading.png");
      }

      await delay(3000);
    } catch (error) {
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
        storyArray={storyArray} // 추가
        title={title} // 추가
        summary={summary} // 추가
      />
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
