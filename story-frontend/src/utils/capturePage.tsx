import html2canvas from 'html2canvas';

export const capturePage = async () => {
  const pageElementId = 'story-page'; 
  const element = document.getElementById(pageElementId);

  if (element) {
    const canvas = await html2canvas(element, {allowTaint : true, useCORS : true});
    const capturePageImage: string = canvas.toDataURL('image/png');

    return capturePageImage;
  }
  else {
    return "";
  }
};

