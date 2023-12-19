import React from 'react';

const Heading = ({ level, text }: { level: number, text: string }) => {
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

    return React.createElement(HeadingTag, { className: `${baseStyle} ${additionalStyle}` }, text);
};

export default Heading;
