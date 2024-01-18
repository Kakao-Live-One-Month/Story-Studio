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

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const visitPage = (page_id: number) => {
    setIsVisitedPage(prevIsVisitedPageArray => {
      const newVisitedPageArray = [...prevIsVisitedPageArray];
      newVisitedPageArray[page_id - 1] = true;
      return newVisitedPageArray;
    });
  };

  const callImageUrl = async (i: number) => {
    try {
      if(!isVisitedPage[page_id - 1]){
   
        await delay(10000);  // 3초 지연
        setImageUrlArray(['abc', 'def', 'ghi', 'abc', 'def', 'ghi', 'abc', 'def', 'ghi']);
        // const newImageUrl = await imageCreateApiRequest(page_id+i);
        // setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
        console.log("imageUrl");
        }
    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  const currentImage = async () => {
    try {
      console.log("currentImage");
      setImageUrl(imageUrlArray[page_id - 1]);
      await delay(3000);
      setLoading(false);
    }
     catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };



///////////////////////////////////////////////////////////////////

  useEffect(() => {
    setLoading(true);
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
    if(imageUrlArray.length !== 0){
    currentImage();
    }
  },[page_id, imageUrlArray]);


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
