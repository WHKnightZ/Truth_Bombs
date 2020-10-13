import React from 'react';

import line from '../images/line.png';

const FlashCard = props => {
    const deg = Math.floor(Math.random() * 5 - 2);

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
                {props.content}
            </div>
            <img src={line} height={54} style={{ position: 'absolute', left: '24px', top: '153px' }} />
            <div style={{ color: 'black', fontSize: '20px', marginLeft: '20px', marginRight: '20px', width: '170px', height: '140px', marginTop: '80px' }}>
                {props.content}
            </div>
        </div >
    );
};

export default FlashCard;