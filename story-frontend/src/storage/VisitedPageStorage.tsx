import React, { useEffect } from 'react';

interface VisitedPageStorageProps {
  isVisitedPage: boolean[];
  setIsVisitedPage: React.Dispatch<React.SetStateAction<boolean[]>>;
  imageUrlArray: string[];
  page_id: number;
}

const VisitedPageStorage: React.FC<VisitedPageStorageProps> = ({isVisitedPage, setIsVisitedPage, imageUrlArray, page_id}) => {


  const visitPage = (pageId: number) => {
    setIsVisitedPage((prevIsVisitedPageArray) => {
      const newVisitedPageArray = [...prevIsVisitedPageArray];
      newVisitedPageArray[pageId - 1] = true;
      return newVisitedPageArray;
    });
  };

  useEffect(() => {
    if (!isVisitedPage[page_id - 1] && imageUrlArray[page_id - 1] !== undefined) {
      visitPage(page_id);
      console.log("visitPage", isVisitedPage);
    }
  }, [page_id, imageUrlArray]);


  const saveVisitToStorage = (isVisitedPage: boolean[]): void => {
    localStorage.setItem('isVisitedPage', JSON.stringify(isVisitedPage));
  };

  const loadsaveVisitFromLocalStorage = (): boolean[] | null => {
    const savedVisit = localStorage.getItem('isVisitedPage');
    return savedVisit ? JSON.parse(savedVisit) : null;
  };

  useEffect(() => {
    const loadedStoryVisit = loadsaveVisitFromLocalStorage();

    if (loadedStoryVisit) {
      setIsVisitedPage(loadedStoryVisit);
      console.log("loadedStoryVisit", loadedStoryVisit)
      console.log("isVisitedPage", isVisitedPage)

    }
  }, []);

  useEffect(() => {
    saveVisitToStorage(isVisitedPage);
  }, [isVisitedPage]);



  return (
    <></>
  );
};

export default VisitedPageStorage;
