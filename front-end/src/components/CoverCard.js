import React from 'react';

import { colors } from '../data/data';
import splash from '../images/splash.png';
import FlashCard from './FlashCard';

const splashStyle1 = {
    position: 'absolute',
    left: '-85px',
    top: '-10px',
    opacity: '20%'
};

const splashStyle2 = {
    position: 'absolute',
    left: '-25px',
    top: '40px',
    transform: 'rotate(140deg)',
    opacity: '40%'
};

const borderStyle = {
    position: 'absolute',
    borderRadius: '20px',
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: '#ffffffcf',
    width: '190px',
    height: '340px',
    left: '25px',
    top: '25px'
};

const CoverCard = props => {
    const deg = Math.floor(Math.random() * 7 - 3);

    const cardStyle = {
        position: 'relative',
        width: '250px',
        height: '400px',
        borderRadius: '25px',
        backgroundColor: colors[props.color],
        overflow: 'hidden',
        transform: 'rotate(' + deg + 'deg)',
        boxShadow: "-2px 2px 6px #9E9E9E5F",
        margin: "20px"
    };

    return (
        <div style={cardStyle}>
            <img style={splashStyle1} src={splash} width="420" height="420" />
            <img style={splashStyle2} src={splash} width="300" height="300" />
            <div style={borderStyle}></div>
            {props.content != null && <FlashCard content={props.content} />}
        </div>
    );
};

export default CoverCard;