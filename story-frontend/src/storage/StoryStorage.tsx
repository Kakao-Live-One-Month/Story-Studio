import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';


interface StoryStorageProps {
  setStoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray: string[];
  firstApiRequest: () => void;
}

const StoryStorage: React.FC<StoryStorageProps> = ({setStoryArray, storyArray, firstApiRequest}) => {
  const param = useParams();
  const navigate = useNavigate();

  
  const saveToLocalStorage = (storyArray: string[]): void => {
    localStorage.setItem('storyArray', JSON.stringify(storyArray));
  };

  const loadFromLocalStorage = (): string[] | null => {
    const savedData = localStorage.getItem('storyArray');
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    const loadedStoryArray = loadFromLocalStorage();
    console.log("loadedStoryArray", loadedStoryArray)
    if (loadedStoryArray) {
      setStoryArray(loadedStoryArray);
    }else{
      firstApiRequest();
      navigate(`/generated/1`); 
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(storyArray);
  }, [storyArray]);
  
  

  return (
    <></>
  );
};

export default StoryStorage;
