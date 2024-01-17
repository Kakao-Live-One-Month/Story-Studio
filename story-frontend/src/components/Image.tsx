// src/components/ThemeInput.tsx
import React, { useEffect, useState } from 'react';
import { imageCreateApiRequest } from '../api/ApiRequest';
import { useLoading, usePage } from '../contexts';

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
  const { isLoading, setLoading } = useLoading();
  const { selectedPage } = usePage();


  const visitPage = (page_id: number) => {
    setIsVisitedPage(prevIsVisitedPageArray => {
      const newVisitedPageArray = [...prevIsVisitedPageArray];
      newVisitedPageArray[page_id - 1] = true;
      return newVisitedPageArray;
    });
  };

  let id: number = 0;
  const callImageUrl = async (i: number) => {
    try {
      // const newImageUrl = await imageCreateApiRequest(page_id+i);
      // setImageUrlArray(prevArray => [...prevArray, newImageUrl]);
      console.log("imageUrl");

      id++;
      console.log("id: ", id);
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

      setLoading(false);
    } catch (error) {
      console.error('이미지 생성 에러:', error);
    }
  };

  const currentImage = async (page_id: number) => {
    const serverImageUrl = `http://localhost:8080/images/image-${page_id}.png`;
    console.log("currentImage 호출", serverImageUrl);
    setImageUrl(serverImageUrl);
    // try {
    //   if (!isVisitedPage[page_id - 1]) {
    //     console.log("실행");
    //     if (imageUrlArray[page_id - 1]!== undefined) {
    //       setImageUrl(imageUrlArray[page_id - 1]);
    //       visitPage(page_id);
    //     }
    //   } else {
    //     const prevImageUrl = imageUrlArray[page_id - 1];
    //     setImageUrl(prevImageUrl);
    //   }
    // }
    //  catch (error) {
    //   console.error('이미지 생성 에러:', error);
    // }
  };

  useEffect(() => {
    if (!isVisitedPage[page_id - 1]) {
      if(page_id % 3 == 1){
        if (selectedPage-page_id > 1){
          for(let i=0; i<3; i++){
            console.log("for index: ", i);
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
  }, [page_id, checkStoryCall]);


    useEffect(() => {
      currentImage(page_id);
      visitPage(page_id);
    },[page_id]);



  return (
    <div>
      <img id="prevImage" src={imageUrl} alt="이미지" />
    </div>
  );
}

export default Image;
