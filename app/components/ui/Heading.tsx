import React from 'react';

interface HeadingProps {
    level: 1 | 2 | 3 | 4;
    children: React.ReactNode;
    [propName: string]: any; // Additional props
}

// where children is the text or React element to be displayed
const Heading: React.FC<HeadingProps> = ({ level, children, ...rest }) => {
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
    const attributes = {
        className: `${baseStyle} ${additionalStyle}`,
        ...rest
    };

    return React.createElement(HeadingTag, attributes, children);

};

export default Heading;
