import React from 'react';

const InteractiveCard = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default InteractiveCard;
