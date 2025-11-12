import React, { Component } from 'react';
import { HashLoader } from 'react-spinners';

type Props = {};
type State = {};

class Loading extends Component<Props, State> {
    render() {
        const loadingStyle: React.CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',  // 뷰포트 전체 너비
            height: '100vh', // 뷰포트 전체 높이
            backgroundColor: 'rgb(255, 255, 255)', // 반투명 배경
            zIndex: 9999 // 다른 요소들 위에 표시
        };

        return (
            <div style={loadingStyle}>
                <HashLoader color={"#36D7B7"} size={100} />
            </div>
        );
    }
}

export default Loading;
