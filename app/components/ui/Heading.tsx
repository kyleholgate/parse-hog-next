import React from 'react';

// where children is the text or React element to be displayed
const Heading = ({ level, children }) => {
    const baseStyle = "font-extrabold text-black tracking-tight leading-tight my-8";
    let HeadingTag = `h${level}`;

    let additionalStyle = "";
    switch (level) {
        case 1:
            additionalStyle = "text-5xl";
            break;
        case 2:
            additionalStyle = "text-4xl text-gray-800";
            break;
        case 3:
            additionalStyle = "text-3xl text-gray-700";
            break;
        case 4:
            additionalStyle = "text-2xl text-gray-600";
            break;
        default:
            HeadingTag = `h2`;
            additionalStyle = "text-4xl text-gray-800";
    }

    return React.createElement(HeadingTag, { className: `${baseStyle} ${additionalStyle}` }, children);
};

export default Heading;
