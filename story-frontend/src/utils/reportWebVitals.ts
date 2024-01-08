import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;


// 이 코드는 웹 애플리케이션의 성능 지표를 보고하는 데 사용됩니다. reportWebVitals 함수는 리액트 기반 프로젝트에서 웹 성능 측정을 위해 사용되며, web-vitals 라이브러리를 통해 다양한 성능 지표를 측정합니다. 각 함수는 다음과 같은 성능 지표를 측정합니다:

// getCLS (Cumulative Layout Shift): 시각적 안정성을 측정합니다. 페이지가 로드되는 동안 발생하는 레이아웃 변화의 정도를 측정합니다. 적은 CLS 점수는 더 나은 사용자 경험을 나타냅니다.

// getFID (First Input Delay): 반응성을 측정합니다. 사용자가 첫 번째 상호작용을 시도했을 때부터 브라우저가 그 상호작용에 반응하기 시작할 때까지의 지연 시간을 측정합니다.

// getFCP (First Contentful Paint): 페이지 로드 성능을 측정합니다. 페이지의 첫 번째 텍스트나 이미지가 화면에 렌더링되는 시간을 측정합니다.

// getLCP (Largest Contentful Paint): 로딩 성능을 측정합니다. 가장 큰 콘텐츠 요소가 화면에 렌더링되는 데 걸린 시간을 측정합니다.

// getTTFB (Time to First Byte): 네트워크 또는 서버 측 응답성을 측정합니다. 사용자의 첫 번째 요청부터 브라우저가 첫 번째 바이트의 데이터를 받기까지의 시간을 측정합니다.
