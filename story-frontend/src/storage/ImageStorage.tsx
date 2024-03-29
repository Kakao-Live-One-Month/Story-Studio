import React, { useEffect } from 'react';


interface ImageStorageProps {
    imageUrlArray: string[];
    page_id: number; 
    setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
}


const ImageStorage: React.FC<ImageStorageProps> = ({imageUrlArray, setImageUrlArray, page_id}) => {
  
    const saveimageUrlToStorage = (imageUrlArray: string[]): void => {
        localStorage.setItem('imageUrlArray', JSON.stringify(imageUrlArray));
      };
    
    const loadsaveimageUrlFromLocalStorage = (): string[] | null => {
      const savedimageUrl = localStorage.getItem('imageUrlArray');
      return savedimageUrl ? JSON.parse(savedimageUrl) : null;
    };

    useEffect(() => {
      const loadedImageUrl = loadsaveimageUrlFromLocalStorage();
      console.log("loadedImageUrl", loadedImageUrl)
      if (loadedImageUrl) {
        setImageUrlArray(loadedImageUrl);
      }

    }, [page_id]);

    useEffect(() => {
      saveimageUrlToStorage(imageUrlArray);
    }, [imageUrlArray]);
    

  return (
    <></>
  );
}; 

export default ImageStorage;