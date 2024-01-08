// src/GeneratingPage.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/GeneratingPage.css'; 
import '../components/GenreSelect'; 
import ThemeInput from '../components/ThemeInput';
import DescribeInput from '../components/DescribeInput';
import GenreSelect from '../components/GenreSelect';
import PageSelect from '../components/PageSelect';
import GeneratingButton from '../components/GeneratingButton';


const GeneratingPage = () => {


  return (

    <div className="generating-page-container">

      <header>
        <h2>나만의 동화책 만들기</h2>
      </header>
      <section className="theme-container">
      <ThemeInput/>
      </section>
      <section className="options-section">
        <GenreSelect/>
      </section>
      <section className="slider-section">
        <PageSelect/>
      </section>
      <section className="textarea-section">
        <DescribeInput/>
      </section>
      <footer>
      <Link to="/generated-1">
       <GeneratingButton/>
        </Link>
      </footer>

    </div>

  );
};

export default GeneratingPage;
