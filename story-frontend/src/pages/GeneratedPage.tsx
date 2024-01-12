// src/GeneratingPage.tsx
import { useNavigate, Outlet,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTheme, useGenre, usePage, useDescribe } from '../contexts';
import { startApiRequest } from '../api/ApiRequest';
import OptionModal from '../components/OptionModal';
import Loading from '../components/Loading';
import Image from '../components/Image';
import { GoToNextPage, GoToPreviousPage } from '../components/PreNextButton';

// props의 타입을 정의하는 인터페이스
interface GeneratedPageProps {
  setStoryArray : React.Dispatch<React.SetStateAction<string[]>>;
  storyArray : string[];
}

const GeneratedPage: React.FC<GeneratedPageProps> = ({setStoryArray, storyArray}) => {
  const param = useParams();
  const page_id = Number(param.page_id);

  const { selectedGenre } = useGenre();
  const { theme } = useTheme();
  const { describe } = useDescribe();
  const { selectedPage } = usePage();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoaging] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");
  const [currentPageImageUrl, setCurrentPageImageUrl] = useState<string>("undefind");
  const [pastpage, setPastpage] = useState<number[]>([]);


  useEffect(() => {
    const firstApiRequest = async () => {
      try {
        setShowLoaging(true);
        let contentsArray = await startApiRequest(theme, selectedGenre, selectedPage, describe);
        console.log(contentsArray);

        if (!contentsArray)
        {
            contentsArray = [] as string[];
        };

        setStoryArray([...storyArray, ...contentsArray]);
        setShowLoaging(false);
        navigate(`/generated/1`);
      } catch (error) {
        console.error('Error StartApiRequest data:', error);
      }
    };

    firstApiRequest();
  }, []);



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <div style={{
        height: '100%',
        alignSelf: 'flex-start',
        padding: '10px',
        cursor: 'pointer'
      }}>
        <span style={{ fontWeight: 'bold', fontSize: '24px' }}>X</span>
      </div>
      <div style={{
        height: '100%',
        backgroundColor: 'lightgrey',
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        position: 'relative', 
      }}>
        
       <GoToPreviousPage/>
       {showLoading && (
       <Loading/>
       )}
        <div style={{
          width: '50%',
          height: '800px',
          backgroundColor: 'grey'
        }}>
         <Image/>
        </div>
        <div style={{
          width: '50%', 
          height: '800px'

        }}>
          <div style={{
            backgroundColor: 'white',
            width: '100%', 
            height: '100%', 

          }} >
            {currentPageStory}
            <Outlet/>
          </div>
        </div>

        <GoToNextPage  setShowModal={setShowModal} showModal={showModal} setPastpage={setPastpage} pastpage={pastpage}/>
        </div>

      {showModal && (
       <OptionModal setChoice={setChoice} choice={choice} setShowModal={setShowModal} page_id={page_id}/>
       )}

      <div style={{
        padding: '10px',
        textAlign: 'center',
      }}>
        
        {page_id}/{selectedPage}
      </div>
    </div>
  );
};

export default GeneratedPage;
