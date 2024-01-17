// src/GeneratingPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Image from '../components/Image';
import { error } from 'console';

// props의 타입을 정의하는 인터페이스
interface EndingPageProps {

}

const EndingPage: React.FC<EndingPageProps> = ({

}) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoaging] = useState(false);
  const [currentPageStory, setCurrentPageStory] = useState<string>("undefind");
  const param = useParams();
  const page_id = Number(param.page_id);
  const navigate = useNavigate();
  // console.log(page_id);  




  return (
    <div style={{
      display: 'flex',
      height: '800px',
      width: '100%',
    }}>
    
      <div style={{
        width: '50%',
        backgroundColor: 'grey'
      }}>
    
      </div>

      <div style={{
        width: '50%', 
      }}>
        <div style={{
          backgroundColor: 'white',
        }}>
          <p>{currentPageStory}</p>
        </div>
      </div>
    </div>
  );
}; 

export default EndingPage;
