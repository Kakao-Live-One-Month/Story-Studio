import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { usePage } from '../contexts';


interface GoToNextPageProps {
  showModal: boolean;
  setPastpage: React.Dispatch<React.SetStateAction<number[]>>;
  pastpage: number[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GoToNextPage: React.FC<GoToNextPageProps> = ({ setShowModal, showModal, setPastpage, pastpage }) => {
  const { selectedPage } = usePage();
  const navigate = useNavigate();
  const param = useParams<{ page_id: string }>(); // URL 파라미터의 타입을 명시적으로 지정
  const page_id = Number(param.page_id);

  const goToNextPage = () => {
    if (page_id % 3 === 0 && !showModal && page_id !== selectedPage) {
      if (!pastpage.includes(page_id)) {
        setPastpage([...pastpage, page_id]);
        setShowModal(true);
      } else {
        setShowModal(false); 
        navigate(`/generated/${page_id + 1}`);
      }
    } else {
      navigate(`/generated/${page_id + 1}`);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '24px',
      padding: '0 10px',
      zIndex: 10000,
    }} onClick={goToNextPage}>
      {'>'}
    </div>
  );
};




    export const GoToPreviousPage = () => {
        const navigate = useNavigate();
        const param = useParams();
        const page_id = Number(param.page_id);
        const prePage = (page_id-1);
        const goToPreviousPage = () => {
        if (page_id > 1) {
          navigate(`/generated/${page_id - 1}`);
        }
        }
        return (
            <div style={{
                position: 'absolute', // 'absolute'는 Position 타입에 포함된 값입니다.
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10000,
                cursor: page_id > 1 ? 'pointer' : 'default',
                fontSize: '24px',
                padding: '0 10px',
                opacity: page_id > 1 ? 1 : 0.5,
                pointerEvents: page_id > 1 ? 'auto' : 'none',}} onClick={page_id > 1 ? goToPreviousPage : undefined}>
             {'<'}
            </div>
        )
      };