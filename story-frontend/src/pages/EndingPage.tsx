import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { convertToPDF } from '../utils/jsPDF';


// props의 타입을 정의하는 인터페이스
interface EndingPageProps {
  capturedPageImages: string[];
  mainTitle: string;
}

const EndingPage: React.FC<EndingPageProps> = ({
  capturedPageImages,
  mainTitle,

}) => {
 

  // PDF 변환 함수입니다. 
  const testhandlePDFDownload = () => {
    const pdfBlob = convertToPDF(capturedPageImages);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${mainTitle}.pdf`;
    link.click();
  };





  return (
    <div className='h-screen w-screen flex justify-center items-center px-4 py-4'
      style={{
        backgroundImage: `url('/img/bg-book2.jpg')`,
        backgroundSize: '100% 100%',
      }}
    > 
      <div className='justify-between mx-auto flex flex-wrap flex-row h-[700px] w-[1440px] px-4 py-4 font-gaegu'
        style={{
          backgroundImage: `url('/img/book-paper2.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center justify-center flex-col w-1/2 h-full px-12 py-20">
          <h1 className=" text-center text-3xl md:text-4xl text-black font-bold font-gowun-batang pb-12">{mainTitle}</h1>

          <div className="flex justify-center w-3/4 overflow-hidden">
          <img src="http://localhost:8080/images/image-1.png" alt=""/>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/2 h-full">
          <h1 className="text-center text-4xl md:text-5xl text-black mb-16 font-gowun-batang font-bold">동화책이 완성됐어요!</h1>
          
          <div className="grid items-end space-y-6 w-1/2 lg:w-[300px] font-gowun-batang font-bold">
            <Link to="/generated/1">
              <button
                className="text-center text-white text-2xl w-full h-16 px-5 rounded-lg bg-[#E5A500] shadow-lg-dark hover:shadow-inner-dark"
                onClick={() => {}}
              >다시 보기</button>
            </Link>

            <button
              className="text-center text-white text-2xl w-full h-16 px-5 rounded-lg bg-[#E5A500] shadow-lg-dark hover:shadow-inner-dark"
              onClick={testhandlePDFDownload}
            >PDF로 저장
            </button>

            <Link to="/generating/">
              <button
                className="text-center text-white text-2xl w-full h-16 px-5 rounded-lg bg-[#E5A500] shadow-lg-dark hover:shadow-inner-dark"
                >새로 만들기</button>
            </Link>

            <Link to="/">
              <button
              className="text-center text-white text-2xl w-full h-16 px-5 rounded-lg bg-[#736F62] shadow-lg-dark hover:shadow-inner-dark"
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