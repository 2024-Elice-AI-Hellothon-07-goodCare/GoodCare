import React from 'react';

export const Card = ({ className = '', children }) => {
    return (
        <div className={`bg-white rounded-lg shadow ${className}`}>
            {children}
        </div>
    );
};