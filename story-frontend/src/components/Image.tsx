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
  setIsVisitedPage: React.Dispatch<React.SetStateAction<boolean[]>>;
  storyArray: string[];

}

const Image: React.FC<ImageProps> = ({imageUrlArray, setImageUrlArray, page_id, isVisitedPage, setIsVisitedPage, checkStoryCall, storyArray}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const { isLoading, setLoading } = useLoading();
  const { selectedPage } = usePage();
  const [imageCall, setImageCall] = useState<boolean>(false);

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  const saveimageUrlToStorage = (imageUrlArray: string[]): void => {
    localStorage.setItem('imageUrlArray', JSON.stringify(imageUrlArray));
  };

  const loadsaveimageUrlFromLocalStorage = (): string[] | null => {
    const savedimageUrl = localStorage.getItem('imageUrlArray');
    return savedimageUrl ? JSON.parse(savedimageUrl) : null;
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 localStorage에서 데이터 로드
    const loadedImageUrl = loadsaveimageUrlFromLocalStorage();
    console.log("loadedImageUrl", loadedImageUrl)
    if (loadedImageUrl) {
      setImageUrlArray(loadedImageUrl);
    }

  }, [page_id]);

  useEffect(() => {
    saveimageUrlToStorage(imageUrlArray);
  }, [imageUrlArray]);


  useEffect(() => {
    console.log("page_id:", page_id);
    console.log("imageUrl", imageUrl);
  }, [imageUrl]);



  const callImageUrl = async (i: number) => {
    try {
      if(!isVisitedPage[page_id - 1]){

        await delay(10000);  // 3초 지연
        // setImageUrlArray([]);
        setImageUrlArray(['abc', 'def', 'ghi', 'abc', 'def', 'ghi', 'abc', 'def', 'ghi']);
        // const newImageUrl = await imageCreateApiRequest(page_id+i);
        // setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        console.log("imageUrl");
        setImageCall(true);
        }
    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  const currentImage = async () => {
    try {
      if (storyArray[page_id - 1] !== undefined) {
      console.log("currentImage");
      await delay(3000);
      setImageUrl(imageUrlArray[page_id - 1]);
    
    }  
      else {
        setImageUrl("이미지 생성중...");
      }
    }
     catch (error) {
      console.error('이미지 생성 에러:', error);
    }
    
  };



///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if ( checkStoryCall && storyArray[page_id - 1] !== undefined) {
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
  }, [page_id]);


  useEffect(() => {
    if(imageUrlArray.length !== 0 && imageCall){
    currentImage();
    }
  },[page_id, imageUrlArray, imageCall]);


  useEffect(() => {
    if (checkStoryCall){
    setLoading(true);}
    console.log("setLoading");
    if (imageUrl !== "이미지 생성중..." && imageUrl !== ''){
      setLoading(false);
      console.log("setLoadingfalse");
    }
  },[checkStoryCall, imageUrl]);


  useEffect(() => {
    console.log("storyArrayChange");
  },[storyArray]);


///////////////////////////////////////////////////////////////////


  return (
    <div>
      {isLoading && (<Loading/>)}
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
