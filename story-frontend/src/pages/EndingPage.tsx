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
    <div className='h-screen w-screen flex justify-center items-center px-4 py-4'
      style={{
        backgroundImage: `url('/img/bg-book2.jpg')`,
        backgroundSize: 'cover',
      }}
    > 
      <div className='justify-between mx-auto flex flex-row h-[700px] w-[1440px] flex-wrap px-4 py-4 font-gaegu'
        style={{
          backgroundImage: `url('/img/book-paper2.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center justify-center flex-col w-1/2 h-full px-12 py-20">
          <h1 className=" text-center text-3xl md:text-4xl text-black font-bold font-gowun-batang pb-12">책 제목</h1>

          <div className="flex justify-center w-3/4 overflow-hidden">
          <img src="https://picsum.photos/500/600" alt=""/>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/2 h-full">
          <h1 className="text-center text-4xl md:text-5xl text-black mb-12">동화책이 완성됐어요!</h1>
          
          <div className="grid items-end space-y-6 w-1/2 lg:w-[240px]">
            <Link to="/generated/1">
              <button
                className="text-center text-white text-2xl md:text-3xl w-full h-16 px-5 rounded-lg bg-[#E5A500]"
                onClick={() => {}}
              >다시 보기</button>
              </Link>

              <Link to="/">
              <button
                className="text-center text-white text-2xl md:text-3xl w-full h-16 px-5 rounded-lg bg-[#E5A500]"
                onClick={() => {}}
              >PDF로 저장</button>
              </Link>

              <Link to="/generating/">
              <button
                className="text-center text-white text-2xl md:text-3xl w-full h-16 px-5 rounded-lg bg-[#E5A500]"
                onClick={() => {}}
                >새로 만들기</button>
              </Link>

              <Link to="/">
                <button
                className="text-center text-white text-2xl md:text-3xl w-full h-16 px-5 rounded-lg bg-[#736F62]"
                onClick={() => {}}
                >홈으로 가기</button>
              </Link>
          </div>
        </div>
     </div>
    </div>
  );
}; 

export default EndingPage;