// src/GeneratingPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Image from '../components/Image';
import { error } from 'console';
import { Link } from 'react-router-dom';

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
    <div className="flex flex-col items-center text-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('../../img/endingbg.png')` }}>
      <Link to="/" className="absolute top-0 left-0 p-5">
      <img src="../../img/logo.png" alt="Image" className="cursor-pointer w-20"/>
      </Link>

      <p className="text-5xl md:text-6xl text-[#56044A] mb-24 font-bold font-gowun-batang">동화책이 완성됐어요!</p>
      
      <div className="flex gap-5 md:gap-8 flex-col md:flex-row">
        <Link to="/">
        <button
          className="text-center text-[#D86FC7] text-2xl w-[280px] h-[80px] rounded-[70px] font-bold font-gowun-batang"
          onClick={() => {}}
          style={{
            backgroundImage: `url('../../img/button1.png')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            transition: 'background-image 0.3s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundImage = `url('../../img/selectbutton1.png')`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundImage = `url('../../img/button1.png')`;
          }}
        >PDF 다운받기</button>
        </Link>

        <Link to="/generated/1">
        <button className="text-center text-white text-2xl w-[280px] h-[80px] rounded-[70px] font-bold font-gowun-batang"
          onClick={() => {}}
          style={{
            backgroundImage: `url('../../img/button2.png')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            transition: 'background-image 0.3s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundImage = `url('../../img/selectbutton2.png')`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundImage = `url('../../img/button2.png')`;
          }}
          >이야기 다시보기</button>
        </Link>

        <Link to="/">
          <button
          className="text-center text-[#D86FC7] text-2xl w-[280px] h-[80px] rounded-[70px] font-bold font-gowun-batang"
          onClick={() => {}}
          style={{
            backgroundImage: `url('../../img/button1.png')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            transition: 'background-image 0.3s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundImage = `url('../../img/selectbutton1.png')`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundImage = `url('../../img/button1.png')`;
          }}
          >홈으로 가기</button>
        </Link>
      </div>
    </div>
  );
}; 

export default EndingPage;