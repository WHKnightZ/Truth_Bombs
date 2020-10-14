import React, { useState } from 'react';

import imgLine1 from '../images/line1.png';
import imgLine2 from '../images/line1.png';

const FlashCard = props => {
    const [deg, setDeg] = useState(Math.floor(Math.random() * 5 - 2));
    const [imgLine, setImgLine] = useState(Math.random() > 0.5 ? imgLine1 : imgLine2);

    const flashStyle = {
        width: '210px',
        height: '360px',
        backgroundColor: 'white',
        position: 'absolute',
        left: '20px',
        top: '20px',
        borderRadius: '10px',
        transform: 'rotate(' + deg + 'deg)'
    };

    return (
        <div style={flashStyle}>
            <div style={{ color: 'black', fontSize: '20px', marginLeft: '20px', marginRight: '20px', width: '170px', height: '140px', transform: 'rotate(180deg)' }}>
                {props.question}
            </div>
            <img src={imgLine} height={54} style={{ position: 'absolute', left: '24px', top: '153px' }} />
            <div style={{ color: 'black', fontSize: '20px', marginLeft: '20px', marginRight: '20px', width: '170px', height: '140px', marginTop: '80px' }}>
                {props.question}
            </div>
        </div >
    );
};

export default FlashCard;