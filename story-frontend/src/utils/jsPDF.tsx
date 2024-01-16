import { jsPDF } from 'jspdf';

export const convertToPDF = (capturedPageImages: string[]): Blob => {
  const doc = new jsPDF('l', 'mm', 'a4');

  capturedPageImages.forEach((imgData, index) => {
    if (index > 0) {
      doc.addPage();
    }
    doc.addImage(imgData, 'PNG', 0, 0, 297, 210);
  });

  return new Blob([doc.output('blob')], { type: 'application/pdf' });
};

// 이 함수는 마지막 페이지 이후 PDF 변환 버튼에 넣을 것 