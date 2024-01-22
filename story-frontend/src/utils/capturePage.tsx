import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';

export const capturePageCnavas = async () => {
  const pageElementId = 'story-page'; 
  const element = document.getElementById(pageElementId);

  if (element) {
    const canvas = await html2canvas(element);
    const capturePageImage: string = canvas.toDataURL('image/png');
    
    return capturePageImage;
  }
  else {
    return "";
  }
};


export const capturePageToImage = async () => {
  const pageElementId = 'generated'; 
  const element = document.getElementById(pageElementId);
  if (element) {
    const capturePageImage: string = await toPng(element);
    console.log("캡쳐 성공!");

    // console.log(capturePageImage);
    return capturePageImage;
  }
  else {
    return "";
  }
};
