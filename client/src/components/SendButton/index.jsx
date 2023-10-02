import React from 'react';
import './SendButton.scss';

const SendButton = ({ text, onClick }) => {
    return (
        <>
            <button className="send-button" onClick={onClick}>
                {text}
            </button>
        </>
    );
};

export default SendButton;
